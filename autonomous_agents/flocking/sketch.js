var boids = [], len = 100, rad = 5, wh,  mousePos
function setup() {
	createCanvas(window.innerWidth, window.innerHeight)
	for(var i = 0; i<len; i++){
		boids[i] = new Bird()
	}
	mousePos = createVector(mouseX, mouseY)
	wh = width*height
	noStroke()
	fill(100)
}

function draw() {	
	background(220,255,255)
	mousePos.x = mouseX
	mousePos.y = mouseY
	for(var i = 0; i<len; i++){
		boids[i].update(i)
		boids[i].checkEdge()
		boids[i].display()
	}
}

function Bird(){
	this.loc = createVector(random(width),height+10)
	this.vel = createVector(random(-1,1), random(-1,1))
	this.acc = createVector()
	this.target = createVector()
	//this.col = {r: random(0,55),g: random(0,55),b: random(0,55)}
}

Bird.prototype = {
	update: function(i){
		this.applyBehaviors(i)
		this.vel.limit(.9)
		this.vel.add(this.acc)
		this.loc.add(this.vel)
		this.acc.mult(0)
	},
	display: function(){
		var loc = this.loc,
			vel = this.vel,
			
			v = round(loc.y*vel.y+loc.x*vel.x)
			
		var flap = map(v%25, -25, 25, -2*PI, 2*PI)
		//ellipse(loc.x,loc.y,rad)
		
		push()
		
		var vr = vel.x*vel.y
		var ro = map(vr,-.5,.5,.3,1)
		var r = rad*ro
		translate(loc.x,loc.y)
		/*
		rotate(-vr)
		*/
		rotate(vel.heading()+PI/2)
		push()
		/*
		//fill(255,100,100)
		if(vel.y>0){
			ellipse(0,-r/4,r/2,r/2)
		}else{
			ellipse(0,r/4,r/2,r/2)
		}
		//fill(this.col.r, this.col.g, this.col.b)
		*/
		ellipse(0,r/4,r/2,r/2)
		rotate(flap)
		ellipse(r/2,0,r,r/2)
		rotate(flap*-2)
		ellipse(-r/2,0,r,r/2)
		pop()
		pop()		
	},
	applyBehaviors: function(a){
		var allignment = getAllignment(a)
		var cohesion = getCohesion(a)
		
		this.applyForce(allignment)
		this.applyForce(cohesion)
		
		var seperation = getSeparation(a)
		this.applyForce(seperation)
		 
		var mousePush = getPushFromMouse(a)
		this.applyForce(mousePush)
	},
	applyForce: function(f){
		this.acc.add(f)
	},
	checkEdge: function(){	
//	/*
		if(this.loc.x > width){
			this.loc.x = 0
		}
		if(this.loc.x < 0){
			this.loc.x = width
		}		
		if(this.loc.y > height){
			this.loc.y = 0
		}
		if(this.loc.y < 0){
			this.loc.y = height
		}
//	*/	
	/*
		var l = this.loc
		if(l.x > width*5/5 || l.x < -width/4 || l.y > height*5/4 || l.y < -height/4){
			var toC = createVector(random(width), random(height))
			toC.sub(l).normalize().mult(.01)
			this.applyForce(toC)
		}
		*/
	}
}

function getSeparation(a){
	var sep =  createVector(), l = 0
	for(var i = 0; i < len; i++){
		if(i != a){
			var dis = p5.Vector.dist(boids[a].loc, boids[i].loc)
			if(dis && dis<rad*3){
				var s = boids[i].vel.copy()
				s.sub(boids[a].vel)
				s.div(dis)
				sep.add(s)
				l++
			}
		}
	}
	sep.normalize().div(l)
	return sep.mult(-.1)
}

function getAllignment(a){
	var dir = createVector()
	var l = 0
	for(var i = 0; i < len; i++){
		if(i != a){
			var d = dist(boids[a].loc.x, boids[a].loc.y, boids[i].loc.x, boids[i].loc.y)
			if(d < rad*12){
				dir.add(boids[i].vel)
				l++
			}
		}
	}
	dir.normalize().div(l)
	return dir.mult(.1)
}

function getCohesion(a){
	var toCenter = createVector()
	for(var i = 0; i < len; i++){
		if(i != a){
			var iLoc = boids[i].loc.copy(),
				aLoc = boids[a].loc,
				d = dist(aLoc.x, aLoc.y, iLoc.x, iLoc.y)
			if(d < rad*150 && d > rad){
				toCenter.add(iLoc.sub(aLoc)).normalize().div(d/10)
			}
		}
	}
	return toCenter.div(len)
}


function getPushFromMouse(a){
	var aLoc = boids[a].loc
	var d = p5.Vector.dist(mousePos, aLoc)
	if(d<rad*100 && d>rad){
		var pushMag = mousePos.copy()
		pushMag.sub(aLoc)
		pushMag.normalize()
		pushMag.div(-d/10)
		return pushMag
	}else{
		return createVector()
	}
}



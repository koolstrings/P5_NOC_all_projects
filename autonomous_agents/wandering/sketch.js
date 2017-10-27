var seeker, target, fact;
function setup() {
	createCanvas(window.innerWidth, window.innerHeight)
	seeker = new Seeker()
	target = new Target()
	fact = round(width/2)
	//background(250,150,150)
	background(0,0,25)
	noFill()
}

function draw() {
	//background(25,5)
	//stroke(0,50,50,25)
	//stroke(55,50,0,25)	
	stroke(random(255),random(255),random(255), random(30))
	seeker.attractTo()
	seeker.display()
	seeker.update()
	//seeker.checkEdge()
	target.checkEdge()
}

function Seeker(){
	this.loc = createVector(random(width/2), random(height/2))
	this.vel = createVector()
	this.acc = createVector()
}

Seeker.prototype = {
	update: function(){
		this.vel.add(this.acc)
		var v = this.vel.mag()
		this.loc.add(this.vel)
		this.acc.mult(0)
	},
	display: function(){
		var loc = this.loc
		fill(55)
		//rect(this.loc.x-3, this.loc.y-3, 6,6)
	},
	attractTo: function(){
		var desired = target.loc.copy()
		desired.sub(this.loc)
		
		var d = desired.mag(),
			maxSp = .5
		
		desired.normalize()	
		
		if(d < fact){
			desired.limit(constrain(d,0,fact,0,maxSp))
			this.wander()
		}else{
			//target.display(1)
			desired.limit(maxSp)
		}
		
		
		var attraction = desired.sub(this.vel)
		
		attraction.limit(.5)
		
		this.applyForce(attraction)
	},
	wander: function(){
		var t = createVector(random(-1,1), random(-1,1));
		t.normalize()
		t.mult(1)
		t.add(target.loc)
		line(this.loc.x, this.loc.y, target.loc.x, target.loc.y)
		//target.display(1)
		target.moveTo(t)
	},
	applyForce: function(f){
		var force = f.copy()
		this.acc.add(force)
	},
	checkEdge: function(){
		checkEdge(this)
	}
}

function Target(){
	this.loc = createVector(random(width/2), random(height/2))
	this.sp = createVector(),
	this.display = function(){
		fill(230, 50)
		ellipse(this.loc.x, this.loc.y, 50)
	},
	this.checkEdge = function(){
		checkEdge(this)
	},
	this.moveTo = function(t){		
		checkEdge({loc: t})
		var sp = t.copy().sub(this.loc)
		sp.normalize()
		sp.mult(.5)
		this.sp.add(sp)
		this.loc.add(this.sp)
	}
}

function checkEdge(obj){
	if(obj.vel){	
		if(obj.loc.x < 0 || obj.loc.x > width){
			obj.vel.x *= -1
		}else if (obj.loc.y < 0 || obj.loc.y > height){
			obj.vel.y *= -1
		}
	}else{
		if(obj.loc.x < 0 || obj.loc.x > width || obj.loc.y < 0 || obj.loc.y > height){
			var toCenter = createVector(width/2, height/2)
			toCenter.sub(obj.loc)
			toCenter.normalize()
			toCenter.mult(2)
			obj.loc.add(toCenter)
		}
	}
}

function mousePressed(){
	background(0,0,25)
}
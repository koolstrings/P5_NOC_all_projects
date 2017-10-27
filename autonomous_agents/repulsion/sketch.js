var attractor, repulsor, bls = [], rad = 1, count , bg
function setup() {
	createCanvas(window.innerWidth, window.innerHeight)
	count = round(width/25) || 10
	Attractor()
	Repulsor()	
	for(var i = 0; i< count; i++){
		bls.push(new EnergyNode())
	}
	//bg = loadImage("http://bossfight.co/wp-content/uploads/2017/03/bossfight-free-stock-photos-ocean-sea-rocks-mountains.jpg");
	//stroke(0)
}

function draw() {
	noStroke()
	background(240,248,255)
	//background(bg)
	attractor.update()
	//attractor.checkCollision()
	attractor.checkEdge()
	attractor.display()
	//if(frameCount%15 === 0){
	//	repulsor.applyForce(createVector(random(-1,1), random(-1,1)))		
	//}
	repulsor.update()
	repulsor.repulse(attractor)
	repulsor.checkCollision()
	repulsor.checkEdge()
	repulsor.display()
	
	for(var i = 0; i< count; i++){
		bls[i].update()
		repulsor.repulse(i)
		attractor.attract(i)
		bls[i].checkCollision(i)
		bls[i].checkEdge()
		bls[i].display(i)
	}
	fill(0,0,255,10)
	rect(0,height*3/5,width,height*3/5)
}

function EnergyNode(col, v, loc){
	this.loc = loc || createVector(random(width), -random(height/2))
	this.vel = v || createVector()
	this.acc = createVector()
	this.rad = round(random(1,20))/5
	this.col = col || 200 - this.rad*30
	this.velLimit = this.rad/2
	this.repFactor = round(random()*-10)/50
}

EnergyNode.prototype = {
	update: function(){
		this.vel.limit(this.velLimit)
		this.vel.add(this.acc)
		this.loc.add(this.vel)
		this.acc.mult(0)
	},
	display: function(i){
		//stroke(0)
		push()
		//rectMode(CENTER)
		translate(this.loc.x, this.loc.y)
		rotate(this.vel.x*this.vel.y)
		fill(this.col)
		//stroke(this.col)
		var r = this.rad*2 || rad*2
		var f = frameCount
		ellipse(0,0,r, r/4)
		ellipse(0,r/4,r/4, r/4)
		//ellipse(this.loc.x, this.loc.y, r, r/2)
		//ellipse(-r/2-1,-r/4,/*this.loc.x, this.loc.y, */r/2)
		//rect(r/4,0,r,r)
		pop()
	},
	applyForce(f){
		this.acc.add(f)
	},
	checkCollision: function(i){
		var thisLoc = this.loc.copy()
		for(var j = 0; j< count; j++){
			if(i!=j){
				var dis = bls[j].loc.copy()
				dis.sub(thisLoc)
				var d = dis.mag()
				var r = this.rad*2 || rad*2
				if(d<r*2){
					dis.normalize()
					dis.mult(this.repFactor)
					this.applyForce(dis)
				}
			}
		}
	},
	checkEdge: function(){
		var thisLoc = this.loc.copy()
		if(thisLoc.x > width+10){
			this.loc.x = -10
			//this.applyForce(createVector(-1,0))
			//this.vel.x *= -1
		}
		if(thisLoc.x < -10){
			this.loc.x = width+10
			//this.applyForce(createVector(1,0))
			//this.vel.x *= -1
		}/*
		if(thisLoc.y > height*3/5-count/10){
			//this.loc.y = -10
			this.applyForce(createVector(0,-.5))
			//this.vel.mult(.1)
		}*/
		if(thisLoc.y > height*3/5){
			//this.loc.y = -10
			this.applyForce(createVector(0,-.1))
			//this.vel.y *= 0 
			//this.vel.y *= .1 
		}
		if(thisLoc.y < -10){
			//this.loc.y = height/2
			this.applyForce(createVector(0,1))
			this.vel.y *= -.1
		}
			
	}
}

function Attractor(){
	attractor = new EnergyNode(0, createVector(random(-1, 1),random(-1, 1)), createVector(random(width), random(height)))
	attractor.rad = 5
	attractor.attract = function(i){
		var obj = bls[i]
		var attractionforce = attractor.loc.copy().sub(obj.loc)
		var a = attractionforce.mag()
		if(a > 50){
			attractionforce.normalize()
			attractionforce.mult(.02)
			obj.applyForce(attractionforce)
		}else{
			noFill()
			//stroke(255, 150-2*a)
			//if(obj.col < 255){				
				attractor.checkCollision()			
			//	obj.col += 30
			//}
		}
		
	}
	/*
	attractor.display = function(){
		return;
	}
	*/
}

function Repulsor(){
	repulsor = new EnergyNode('red', createVector(random(-.1, .1),random(-.1, .1)))
	repulsor.rad = 5
	repulsor.repulse = function(i){
		var obj = bls[i] || i
		var repForce = repulsor.loc.copy().sub(obj.loc)
		if(dist(repulsor.loc.x,repulsor.loc.y,obj.loc.x,obj.loc.y)  < 250){
			//if(obj.col > 0){
			//	obj.col -= 30
			//};
			////stroke(random(255),random(255),random(255))
			//line(obj.loc.x, obj.loc.y, repulsor.loc.x, repulsor.loc.y)
			repForce.normalize()
			repForce.mult(obj.repFactor)
			obj.applyForce(repForce)
			//repulsor.applyForce(repForce.mult(-.01))
		}
	};
	repulsor.update = function(){
		this.loc = createVector(mouseX, mouseY)
	};	
	repulsor.display = function(){
		return;
	}
}
var particle, gravity
function setup() {
	createCanvas(500, 400)
	particle = new Particle()
	gravity = createVector(0, .1)	
	noStroke()
}

function draw() {
	background(0)
	particle.update()
	particle.display()
}

function Particle(){
	this.loc = createVector(width/2, height/5),
	this.vel = createVector(random(-2,2), random(-2,0)),
	this.acc = createVector(),
	this.lifeSpan = 255
}

Particle.prototype = {
	update: function(){
		if(this.lifeSpan > 0){
			this.applyForce(gravity)
			this.vel.add(this.acc)
			this.loc.add(this.vel)
			this.acc.mult(0)
			this.lifeSpan -= 2
		}
	},
	display: function(){
		fill(0,255,0, this.lifeSpan)
		push()
		translate(this.loc.x, this.loc.y)
		rectMode(CENTER)
		rotate(this.vel.y*this.vel.x*1.1)
		rect(0,0, 10, 10)
		pop()
	},
	applyForce: function(f){
		var force = f.copy()
		this.acc.add(force)
	}
}

function mouseClicked(){
	particle = new Particle()	
}
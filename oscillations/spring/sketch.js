var spring, k = -.05, gravity, len = 50, damping;

function setup() {
	createCanvas(500,500)
	spring = new Pend(random(width),random(height))
	gravity = createVector(0,0.1)
}

function draw() {
	background(255)
	spring.update()
	spring.display()
}

function Pend(x,y){
	this.origin = createVector(width/2,height/5);
	this.restLoc = createVector(this.origin.x, this.origin.y+len)
	this.loc = createVector(x,y);
	this.vel = createVector(random(1),0);
	this.acc = createVector();
	this.rad = 10
}

Pend.prototype = {
	update: function(){	
		var d = round(p5.Vector.dist(this.restLoc, this.loc))
		var springForce = this.spring(d).mult(k)
		this.applyForce(springForce)
		this.applyForce(gravity)
		this.vel.add(this.acc)
		this.vel.mult(.9)
		this.loc.add(this.vel)
		this.acc.mult(0)
	},
	spring: function(d){
		var force = this.loc.copy()
		force.sub(this.restLoc)
		return force
	},
	display: function(){
		noFill()
		var turns = 20
		for(var i = 0; i< turns; i++){
			var xLoc = this.origin.x+(this.loc.x - this.origin.x)/turns*i
			var yLoc = this.origin.y+(this.loc.y - this.origin.y)/turns*i
			ellipse(xLoc, yLoc, this.rad/50*i+3)
		}
		fill(100)		
		ellipse(this.loc.x, this.loc.y, this.rad)
	},
	applyForce: function(f){
		var force = f.copy()
		this.acc.add(force)
	}
}

function mousePressed(){
	var placeAt = createVector(mouseX,mouseY)
	spring = new Pend(placeAt.x, placeAt.y)
}

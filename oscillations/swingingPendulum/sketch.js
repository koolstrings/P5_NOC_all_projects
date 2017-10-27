var pendulum, length = 150, gravity = .01;
function setup() {
	createCanvas(500, 500)
	pendulum = new Pendulum()
}

function draw() {
	background(255)
	pendulum.update()
	pendulum.display()
	fill(100)
}


function Pendulum(){
	this.origin = createVector(width/2, height/5)
	this.loc = createVector(0,length)
	this.angle = 45
	this.angularVel = 0;
	this.angularAcc = 0;
	this.damping = .99
}

Pendulum.prototype = {
	update: function(){
		this.angularAcc = -gravity*sin(this.angle)
		this.angularVel += this.angularAcc
		this.angularVel *= this.damping
		this.angle += this.angularVel
	},
	display: function(){
		translate(width/2, height/5)
		this.loc = createVector(length*sin(this.angle), length*cos(this.angle))
		line(0, 0, this.loc.x, this.loc.y)
		ellipse(this.loc.x, this.loc.y, 25)
	},
	addForce: function(f){
		var force = this.f.copy()
		this.acc.add(force)
	}
}

function mousePressed(){
	pendulum.angle = mouseX/10
}
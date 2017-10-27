var seeker, target
function setup() {
	createCanvas(600, 400)
	seeker = new Seeker()
	target = new Target()
}

function draw() {
	background(100)
	seeker.attractTo()
	seeker.update()
	target.display()
	seeker.display()
}

function Seeker(){
	this.loc = createVector(random(width), random(height))
	this.vel = createVector()
	this.acc = createVector()
}

Seeker.prototype = {
	update: function(){
		this.vel.add(this.acc)
		this.loc.add(this.vel)
		this.acc.mult(0)
	},
	display: function(){
		var loc = this.loc
		fill(55)
		rect(this.loc.x-2, this.loc.y-2, 4,4)
	},
	attractTo: function(){
		var desired = target.loc.copy()
		desired.sub(this.loc)
		desired.limit(10)
		
		var attraction = desired.sub(this.vel)
		attraction.limit(.1)
		this.applyForce(attraction)
	},
	applyForce: function(f){
		var force = f.copy()
		this.acc.add(force)
	}
}

function Target(){
	this.loc = createVector(mouseX, mouseY)
	this.display = function(){
		fill(200)
		ellipse(this.loc.x, this.loc.y, 20)
	}
}

function mousePressed(){
	target.loc = createVector(mouseX, mouseY)
}
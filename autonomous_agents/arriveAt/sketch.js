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
		var v = this.vel.mag()
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
		
		var d = desired.mag(),
			maxSp = 3
		
		desired.normalize()	
		
		if(d < 100){
			desired.limit(constrain(d,0,100,0,maxSp))
		}else{
			desired.limit(maxSp)
		}
		
		
		var attraction = desired.sub(this.vel)
		
		attraction.limit(2)
		
		this.applyForce(attraction)
	},
	applyForce: function(f){
		var force = f.copy()
		this.acc.add(force)
	}
}

function Target(){
	this.loc = createVector(random(width), random(width))
	this.display = function(){
		fill(200)
		ellipse(this.loc.x, this.loc.y, 50)
	}
}

function mousePressed(){
	target.loc = createVector(mouseX, mouseY)
}
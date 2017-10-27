var balloon = [], wind, gravity, count = 10, radiusRange = 10;

function setup() {
	createCanvas(800, 400)
	for(var i = 0; i< count; i++){	
		balloon[i] =  new Flier();	
	}
	gravity = createVector(0, .1)
	wind = createVector(.1,0)
}

function draw() {
	background(255, 20);
	for(var i = 0; i< count; i++){	
		balloon[i].update();
		balloon[i].checkEdge()
		balloon[i].display(i);
	}
}

function Flier(){
	this.loc = createVector(random(width), random(height));
	this.vel = createVector(1.5,2);
	this.acceleration = createVector();
	this.rad = random(radiusRange);
}

Flier.prototype = {
	update: function(){
		this.vel.limit(7);
		this.applyForce(wind);
		this.applyForce(gravity);
		this.addFriction();
		this.acceleration.div(20 - this.rad)
		this.vel.add(this.acceleration);
		this.loc.add(this.vel);
		this.acceleration.mult(0);
	},	
	
	checkEdge: function(){
		var limiter = radiusRange + this.rad
		if(this.loc.x > (width - limiter)){
			this.loc.x = (width - limiter)
			this.vel.x *= -1
		}
		if(this.loc.x < limiter){
			this.loc.x = limiter;
			this.vel.x *= -1
		}
		if(this.loc.y > (height - limiter)){
			this.loc.y = (height - limiter)
			this.vel.y *= -1
		}
		if(this.loc.y < limiter){
			this.loc.y = limiter;
			this.vel.y *= -1
		}
	},
	display: function(i){
		//noStroke()
		fill(0,100,200)
		ellipse(this.loc.x, this.loc.y, this.rad*2)
		//text(round(this.rad*2),this.loc.x-this.rad*2, this.loc.y+this.rad*2)
	},
	applyForce: function(f){
		var force = f.copy();
		this.acceleration.add(force)
	},
	addFriction: function(){
		var f = this.vel.copy();
		f.normalize()
		f.mult(-.05)
		this.applyForce(f)
	}
}

function mousePressed(){	
	wind = createVector(random(-.1, .1),random(-.1, .1))
}
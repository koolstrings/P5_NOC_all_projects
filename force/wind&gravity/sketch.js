var balloon = [], wind, gravity, count = 200;

function setup() {
	createCanvas(800, 400)
	for(var i = 0; i< count; i++){	
		balloon[i] =  new Flier();	
	}
	gravity = createVector(0, .05)
	wind = createVector(random(1),0)
}

function draw() {
	background(255, 150);
	for(var i = 0; i< count; i++){	
		balloon[i].update();
		balloon[i].checkEdge()
		balloon[i].display(i);
	}
}

function Flier(){
	this.loc = createVector(random(width), random(height));
	this.vel = createVector(2,2);
	this.acceleration = createVector();
	this.rad = random(20);
}

Flier.prototype = {
	update: function(){
		this.vel.limit(5);
		this.applyForce(wind);
		this.applyForce(gravity);
		this.acceleration.div(20 - this.rad)
		this.vel.add(this.acceleration);
		this.loc.add(this.vel);
		this.acceleration.mult(0);
	},	
	
	checkEdge: function(){
		if(this.loc.x > (width - this.rad)){
			this.loc.x = this.rad;
			//this.vel.x *= -1
		}
		if(this.loc.x < this.rad){
			this.loc.x = (width - this.rad)
			//this.vel.x *= -1
		}
		if(this.loc.y > (height - this.rad)){
			this.loc.y = this.rad;
			//this.vel.y *= -1
		}
		if(this.loc.y < this.rad){
			this.loc.y = (height - this.rad)
			//this.vel.y *= -1
		}
	},
	display: function(i){
		noStroke()
		fill(0,100,200, 50)
		ellipse(this.loc.x, this.loc.y, this.rad/4)
		
		/*
		stroke(0,100,200, 50);
		if(i >= 1){		
			line(this.loc.x, this.loc.y, balloon[i-1].loc.x, balloon[i-1].loc.y)	
		}
		*/
	},
	applyForce: function(f){
		var force = f.copy();
		this.acceleration.add(force)
	}
}

function mousePressed(){	
	wind = createVector(random(-.1, .1),random(-.1, .1))
}
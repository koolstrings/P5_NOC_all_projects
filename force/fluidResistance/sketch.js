var ball = [], liquid, count = 10, gravity;

function setup() {
	createCanvas(800, 400)
	shiftx = width/(count*2)
	liquid = new Liquid()
	gravity = createVector(0,.01)
	for(var i = 0; i< count; i++){
		ball[i] = new Ball(shiftx*(i*2 + 1))
	}
}

function draw() {
	background(255);
	for(var i = 0; i< count; i++){
		ball[i].update();
		ball[i].applyForce(gravity)
		liquid.drag(i)
		ball[i].checkEdge();
		ball[i].display();
	}
	liquid.display()	
}



function Ball(x){
	this.loc = createVector(x, 0)
	this.vel = createVector()
	this.acc = createVector()
	this.rad = random(20)
}

Ball.prototype = {
	update: function(){
		this.vel.add(this.acc)
		this.loc.add(this.vel)
		this.acc.mult(0)
	},
	display: function(){
		fill(255,255,0);
		ellipse(this.loc.x, this.loc.y, this.rad*2)
	},
	applyForce: function(f){
		var frc = f.copy()
		frc.mult(this.rad/5)
		this.acc.add(frc)
	},
	checkEdge: function(){
		if(this.loc.x > (width - this.rad)){
			this.loc.x = (width - this.rad)
			this.vel.x *= -1
		}
		if(this.loc.x < this.rad){
			this.loc.x = this.rad;
			this.vel.x *= -1
		}
		if(this.loc.y > (height - this.rad)){
			this.loc.y = (height - this.rad)
			this.vel.y *= -1
		}
		if(this.loc.y < this.rad){
			this.loc.y = this.rad;
			this.vel.y *= -1
		}
	}
}

function Liquid(){
	this.space = createVector(width,-height/2)
	this.display = function(){
		fill(0,100,255,50)
		rect(0,height-1,this.space.x-1,this.space.y-1)
	}
}

Liquid.prototype = {
	drag: function(i){
		var b = ball[i]
		if(b.loc.y > height/2){
			var v = b.vel.mag()
			var d = v*v*(-.05)
			var dr = b.vel.copy()
			dr.normalize()
			dr.mult(d)
			b.applyForce(dr)
		}
	}	
}


var car;

function setup() {
	createCanvas(400, 400)
	car = new Car()
}

function draw() {
	background(255)
	stroke(100)
	car.move();
	car.checkEdge()
	car.display();	
}

function Car(){
	this.loc = createVector(width/2, height/2)
	this.vel = createVector()	
	this.acc = createVector()
	this.angle = 0;
}

Car.prototype = {
	move: function(){
		this.vel.add(this.acc)
		this.loc.add(this.vel)		
		this.vel.limit(2)
		this.angle = getTilt(this.acc);
		this.acc.mult(0)		
	},
	display: function(){
		fill(100)
		push();
		rectMode(CENTER)
		translate(this.loc.x, this.loc.y)
		rotate(this.angle)		
		//this.angle = 0
		ellipse(0, 5,5)
		line(-2,-10, -2, 5)
		line(2,-10, 2, 5)
		pop();
	},
	checkEdge: function(){
		if(this.loc.x<0){
			this.loc.x = 0
		}if(this.loc.x>width){
			this.loc.x = width
		}if(this.loc.y<0){
			this.loc.y = 0
		}if(this.loc.y>width){
			this.loc.y = 0
		}
	}
}

function getTilt(acc){
	var x = acc.x - car.vel.x,
		y = acc.y - car.vel.y;
		
	var angle = atan(x,y)
	return angle		
}


onkeydown = function(e){
	if(e.keyCode == 37){
		var goLeft = createVector(-.5,0)
		car.acc.add(goLeft)
	}
	if(e.keyCode == 38){
		var goUp = createVector(0,-.5)
		car.acc.add(goUp)
	}
	if(e.keyCode == 39){
		var goRight = createVector(.5,0)
		car.acc.add(goRight)
	}
	if(e.keyCode == 40){
		var goDown = createVector(0,.5)
		car.acc.add(goDown)
	}
}
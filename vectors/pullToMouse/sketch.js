var ball;

function setup() {
	createCanvas(800, 400)
	ball = new Ball();
}

function draw() {
	background(255)
	ball.update();
	ball.checkEdge();	
	ball.display();
}

function Ball(){
	this.loc = createVector(random(width), random(height));
	this.vel = createVector();
	this.acc = createVector();
}

Ball.prototype = {
	update: function(){
		var mouse = createVector(mouseX, mouseY),
			dir = p5.Vector.sub(mouse, this.loc);
			
		dir.normalize()
		dir.mult(.5)
		
		this.vel.limit(10)
		this.acc = dir
		this.vel.add(this.acc)
		this.loc.add(this.vel)
		this.acc.mult(0)
	},	
	checkEdge: function(){
		if(this.loc.x > width || this.loc.x < 0){
			this.vel.x *= -random(.5, 1.5)
		}
		if(this.loc.y > height || this.loc.y < 0){
			this.vel.y *= -random(.5, 1.5)
		}
	},
	display: function(){
		//noStroke();
		stroke(100)
		ellipse(this.loc.x, this.loc.y, 3, 3)
	}
}

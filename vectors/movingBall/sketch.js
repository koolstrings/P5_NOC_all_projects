var ball;

function setup() {
	createCanvas(800, 400)
	ball =  new Mover()
}

function draw() {
	background(180);
	ball.update();
	ball.checkEdge();	
	ball.display();
}

function Mover(){
	this.loc = createVector(random(width), random(height));
	this.velocity = createVector(random(3), random(3));
	this.rad = 10;
	this.display =  function(){
		fill(100)
		ellipse(this.loc.x, this.loc.y, this.rad)
	};
	
	this.checkEdge = function(){
		if(this.loc.x > width || this.loc.x < 0){
			this.velocity.x *= -random(.5, 1.5)
		}
		if(this.loc.y > height || this.loc.y < 0){
			this.velocity.y *= -random(.5, 1.5)
		}
	}
	this.update = function(){
		this.loc.add(this.velocity)
	}
}

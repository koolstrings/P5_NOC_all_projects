var ball;
var rad = 15;

function setup() {
	createCanvas(800, 300)
	ball = new Ball();
}

function draw() {
	background(100)
	ball.update();
	ball.checkEdges();
	ball.display();
}

function Ball(){
	this.pos = createVector(random(width), random(height));
	this.speed = createVector(3,3)
}

Ball.prototype= {
	update: function(){
		this.pos.add(this.speed)
	},
	checkEdges: function(){
		if(this.pos.x > width - rad || this.pos.x < rad){
			this.speed.x *= -1
		}
		if(this.pos.y > height - rad || this.pos.y < rad){
			this.speed.y *= -1
		}
	},
	display: function(){
		fill("amber")
		noStroke();
		ellipse(this.pos.x, this.pos.y, rad*2, rad*2)
	}
	
}
var ball;
var rad = 15;

function setup() {
	createCanvas(800, 300)
	ball = new Ball()
}

function draw() {
	background(100)
	ball.update();
	ball.checkEdges();
	ball.display();
}

function Ball(){
	this.x = random(width);
	this.y = random(height);	
	this.xSpeed = 2;	
	this.ySpeed = 2;
}

Ball.prototype= {
	update: function(){
		this.x += this.xSpeed
		this.y += this.ySpeed
	},
	checkEdges: function(){
		if(this.x > width - rad || this.x < rad){
			this.xSpeed *= -1
		}
		if(this.y > height - rad || this.y < rad){
			this.ySpeed *= -1
		}
	},
	display: function(){
		fill(255)
		ellipse(this.x, this.y, rad*2)
	}
	
}
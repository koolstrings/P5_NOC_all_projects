var mover, stepSize = 10;


function setup() {
	createCanvas(800,600)
	mover = new Mover()
}

function draw() {
	//background(255)	
	mover.update();
	chooseColor();
	mover.checkEdges();
	mover.display();
}

function Mover(){
	this.x = width/2;
	this.y = height/2
}

Mover.prototype = {
	display: function(){
		noStroke()
		ellipse(this.x, this.y, random(stepSize));
	},
	update: function(){
		this.x += stepSize*(round(random(1) - random(1)));
		this.y += stepSize*(round(random(1) - random(1)));
	},
	checkEdges: function(){
		if(this.x > width){
			this.x -= stepSize
		}
		if(this.x < 0){
			this.x += stepSize
		}
		if(this.y > height){
			this.y -= stepSize
		}
		if(this.y < 0){
			this.y += stepSize
		}
		
	}
}

function chooseColor(){
	var filler = ['red', 'blue', 'green', 'black']
	var picker = round(random(3))
	fill(filler[picker])
	//fill(random(0, 50), random(0, 50), random(100, 200), 10)
}
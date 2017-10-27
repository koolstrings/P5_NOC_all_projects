var mover;

function setup() {
	createCanvas(800,600)
	mover = new Mover()
}

function draw() {
	//background(200)	
	mover.update();
	mover.checkEdges();
	mover.display();
}

function Mover(){
	this.loc = createVector(random(width),random(height))
}

Mover.prototype = {
	display: function(){
		stroke(55,25)		
		noFill()
		ellipse(this.loc.x, this.loc.y, 1);
	},
	update: function(){
		var goTo = createVector(random(-.5,.5), random(-.5,.5))
		if(random()/100>random()){
			goTo.mult(random(100))
			line(this.loc.x, this.loc.y, this.loc.x + goTo.x, this.loc.y + goTo.y)
		}
		this.loc.add(goTo)
	},
	checkEdges: function(){
		if(this.loc.x > width || this.loc.x < 0 || this.loc.y > height || this.loc.y < 0){
			console.log("new!!")
			mover = new Mover()
		}
		
	}
}
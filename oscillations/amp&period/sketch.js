var osc = [], count = prompt(1)||1
function setup() {
	createCanvas(800, 400)
	for(var i=0; i<count; i++){
		osc[i] = new Oscillator
	}
}

function draw() {
	background(255)
	fill(50, 100)
	translate(width/2, height/2)
	for(var i=0; i<count; i++){
		osc[i].update()
		osc[i].display()
	}
}

function Oscillator(){
	this.angle = 0;
	this.angularVel = random(0,.05)
	this.rotate = random(0,360)
    this.amplitude = createVector(random(width/4),random(height/4));
}

Oscillator.prototype = {
	update: function(){
		this.angle += this.angularVel;
	},
	display: function(){

		rotate(this.angle)
		var x = .05*sin(this.angle)*this.amplitude.x		
		var y = .05*sin(this.angle)*this.amplitude.y
		/*if(x<0){
			x *= -1
		}*/
		line(0,0, x, y)
		ellipse(x , y, 2)
		
		//line(0,0, -x, 0)
		//ellipse(-x , 0, 2)
	}	
}
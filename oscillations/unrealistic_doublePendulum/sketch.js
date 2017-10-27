var pendulum = [], length = 100, gravity = .01, count = 3;
function setup() {
	createCanvas(500, 500)
	for(var i = 0; i< count; i++){	
		pendulum[i] = new Pendulum(width/2, i*length+height/5)
	}
	
	fill(100)
}

function draw() {
	background(255)
	for(var i = 0; i< count; i++){	
		pendulum[i].update()
		pendulum[i].display(i)	
	}
}


function Pendulum(x,y){
	this.origin = createVector(x,y)
	this.loc = createVector(0,length)
	this.angle = 45
	this.angularVel = 0;
	this.angularAcc = 0;
	this.damping = .999
}

Pendulum.prototype = {
	update: function(){
		this.angularAcc = -gravity*sin(this.angle)
		this.angularVel += this.angularAcc
		this.angularVel *= this.damping
		this.angle += this.angularVel
	},
	display: function(i){
		if(i>0){
			translate(pendulum[i-1].loc.x,pendulum[i-1].loc.y)
		}else{
			translate(this.origin.x,this.origin.y)
		}
		this.loc = createVector(length*sin(this.angle), length*cos(this.angle))
		line(0, 0, this.loc.x, this.loc.y)
		ellipse(this.loc.x, this.loc.y, 25)
	},
	addForce: function(f){
		var force = this.f.copy()
		this.acc.add(force)
	}
}

function mousePressed(){
	pendulum[0].angle = mouseX/10
}
var attractor, mover = [], count = 5;
var shiftX
function setup() {
	createCanvas(800, 400)
	shiftX = width/(count*15)
	for(var i = 0; i< count; i++){
		mover[i] = new Obj(i)
	}
	attractor = new Attractor(width/2, height/2, 10)
}

function draw() {
	background(100,100,100255);
	attractor.update()
	attractor.display()
	for(var i = 0; i< count; i++){
		mover[i].update(i);
		mover[i].display();
		attractor.attract(mover[i])
	}
}



function Obj(i){
	this.loc = createVector(width/3+i*shiftX, height/2 + 10);
	this.vel = createVector(-1,count-i);
	this.acc = createVector();
	this.rad = 10-i;
}

Obj.prototype = {
	update: function(i){
		this.vel.limit((count-i+1)*2)
		this.vel.add(this.acc)
		this.loc.add(this.vel)
		this.acc.mult(0)
	},
	display: function(){
		noStroke()
		fill(50,255,100);
		ellipse(this.loc.x, this.loc.y, this.rad)
	},
	applyForce: function(f){
		var frc = f.copy()
		frc.mult(this.rad/5)
		this.acc.add(frc)
	}
}

function Attractor(x,y,r){
	this.loc = createVector(x, y)
	this.vel = createVector()
	this.acc = createVector()
	this.rad = r
}

Attractor.prototype = {
	update: function(){
		this.vel.limit(.1)
		//this.acc = createVector(random(-.01, .01),random(-.01, .01),)
		this.vel.add(this.acc)
		this.loc.add(this.vel)
		this.acc.mult(0)
	},
	display: function(){
		fill(255,0,0);
		ellipse(this.loc.x, this.loc.y, this.rad)
	},
	attract: function(m){
		var toCnter = this.loc.copy(), //createVector(mouseX, mouseY)
			dir = toCnter.sub(m.loc),
			dist = dir.mag();
			dir.normalize()
			force = constrain(dist, 25,50)
		
		var attraction = dir.mult((20-m.rad)*this.rad/(force*force))
		m.applyForce(attraction)
	}
}
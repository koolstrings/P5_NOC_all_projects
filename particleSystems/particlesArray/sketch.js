var particle = [], gravity
function setup() {
	createCanvas(500, 400)
	background(0,100,0)
	createNewParticle()
	gravity = createVector(0, .05)	
	noStroke()
}

function draw() {
	background(0,100,0,5)
	var count = particle.length
	if(count){	
		for(var i = count-1  ; i >= 0; i-- ){
			particle[i].update()
			particle[i].display()
			particle[i].checkLife(i)
			particle[i].checkEdge()
		}	
	}	
	createNewParticle()
}

function Particle(){
	this.loc = createVector(width/2, height/2),
	this.vel = createVector(random(-.3,-1), 0),
	this.acc = createVector(),
	this.life = 255;
	this.rad = random(10)
	this.col = {
		r: random(200,220),
		g: random(200,220),
		b: 255, 
		a: this.life
	}
}

Particle.prototype = {
	update: function(){
		if(this.life > 0){
			this.applyForce(gravity)
			this.vel.add(this.acc)
			this.loc.add(this.vel)
			this.acc.mult(0)
			this.life -= 2
		}
	},
	display: function(){
		fill(this.col.r, this.col.g, this.col.b, this.col.a)
		ellipse(this.loc.x, this.loc.y, this.rad)
	},
	applyForce: function(f){
		var force = f.copy()
		this.acc.add(force)
	},
	checkLife: function(i){
		if(this.life < 1){
			particle.splice(i,1)
		}
	},
	checkEdge: function(){
		if(this.loc.y>height || this.loc.y<0){
			this.vel.y *= -random(.1)
			this.rad *= .7
			this.waterWhite()
		}
		if(this.loc.x< 0 || this.loc.x>width){
			this.vel.x += -random(.1)
			this.rad *= .7
			this.waterWhite()
		}
	},
	waterWhite: function(){
		this.col.r = 255;
		this.col.g = 255;
		this.col.b = 255;
		this.col.a = 155;
	}
}

function createNewParticle(){
	if(particle.length<1000){
		var newParticle = []
		for(var i = 0; i<5; i++){		
			newParticle[i] = new Particle()
			particle.push(newParticle[i])		
		}
	}
}
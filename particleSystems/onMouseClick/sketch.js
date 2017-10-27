var particle = [], gravity
function setup() {
	createCanvas(500, 400)
	gravity = createVector(0, .02)
	strokeWeight(3)
}

function draw() {
	background(255)
	var count = particle.length
	if(count){
		for(var i = count-1  ; i >= 0; i-- ){
			var p = particle[i]
			if(p.life){
				p.update()
				p.checkEdge()
				p.display()
				p.checkLife(i)			
			}
		}	
	}
}

function Particle(x,y){
	this.loc = createVector(x, y),
	this.vel = createVector(random(-2,2), random(-2,2)),
	this.acc = createVector(),
	this.life = 255;
	this.rad = random(10)
}

Particle.prototype = {
	update: function(){
		var acc  = this.acc,
			vel = this.vel,
			life = this.life
		if(life > 0){
			this.applyForce(gravity)
			vel.add(acc)
			this.loc.add(vel)
			acc.mult(0)
			this.life -= 1
		}
	},
	display: function(){
		var r = this.rad/2,
			vel = this.vel,
			loc = this.loc
		noFill()
		stroke(50,10,0, this.life)
		push()
		translate(loc.x, loc.y)
		rectMode(CENTER)
		rotate(vel.x*vel.y*10)
		line(-r,0, r,0)
		pop()
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
		var loc = this.loc,
			vel = this.vel,
			lim = 10
		if(loc.y > height - lim || loc.y < lim){
			vel.y *= -.3
			this.addFriction()
		}
		if(loc.x < lim || loc.x > width - lim){
			vel.x *= -.8
		}
	},
	addFriction: function(){
		var vel = this.vel.copy(),
			v = vel.mag();
			fric = vel.normalize().mult(-.1*v*v)
			this.applyForce(fric)
	}
}

function createNewParticle(x,y){
	var x = x || width/2, 
		y = y || height/2
	if(particle.length<300){
		var newParticle = []
		for(var i = 0; i<10; i++){		
			newParticle[i] = new Particle(x,y)
			particle.push(newParticle[i])		
		}
	}
}

function mousePressed(){		
	createNewParticle(
			constrain(mouseX, 10, width-10), 
			constrain(mouseY, 10, height-10)
			)
}
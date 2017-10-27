var particle = [], wind, nameTxt
function setup() {
	createCanvas(window.innerWidth, window.innerHeight)
	rectMode(CENTER)
}

function draw() {
	background(0,100,100)
	var count = particle.length
	if(count){
		for(var i = count-1  ; i >= 0; i-- ){
			var p = particle[i]
			if(p.life){
				p.update(i, count)
				p.checkEdge()
				p.display()
				p.checkLife(i)
			}}}
	createNewParticle()
}

function Particle(x,y){
	this.loc = createVector(x, y);
	this.acc = createVector();
	this.life = 255;
	this.rad = random(10);	
	this.vel = createVector(random(-.1,.1), random(-.1,.1))
}

Particle.prototype = {
	update: function(i, count){
		var acc  = this.acc,
			vel = this.vel,
			life = this.life
		if(life > 0){
			vel.add(acc)
			this.loc.add(vel)
			this.repeller(i, count)
			acc.mult(0)
			this.life -= 1
		}
	},
	display: function(){
		var rad = this.rad,
			vel = this.vel,
			loc = this.loc,
			life = this.life
		stroke(100,0,0,life)
		fill(0,255,255,life)
		push()
		translate(loc.x,loc.y)
		rotate(constrain(loc.x+loc.y, 0, 5000))
		rect(0,0, rad, rad)
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
			vel.y *= -1
		}
		if(loc.x < lim || loc.x > width - lim){
			vel.x *= -1
		}
	},
	repeller: function(i, count){
		for(var j = count-1  ; j >= 0; j-- ){
			if(i !== j ){
				var pi = particle[i],
					pj = particle[j]
				if(pi && pj && p5.Vector.dist(pi.loc, pj.loc) < pi.rad+pj.rad){
					this.vel.mult(-1)
				}}}}
}

function createNewParticle(x,y){
	var x = x || random(width), 
		y = y || random(height)
	if(particle.length<300){
		var newParticle = new Particle(
			constrain(x, 10, width-10), 
			constrain(y, 10, height-10)
			)
		particle.push(newParticle)		
	}
}

window.onresize = function(){
	createCanvas(window.innerWidth, window.innerHeight)
}
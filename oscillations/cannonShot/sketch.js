var prj = [], tx = 30, ty = 300, an = 50, gravity 
function setup() {
	createCanvas(600, 400);
	gravity = createVector(0,.1)
}

function draw(){
	background(255);
	stroke('red')
	if(prj.length>0){
		for(var i=0; i< prj.length; i++){
			prj[i].update();
			prj[i].addForce(gravity)
			prj[i].checkEdge(i)
			prj[i].display();				
		}
	}
	drawBackground()
	if(prj.length>20){
		prj.length = 20
	}
}

function drawBackground(){
	noStroke()
	fill(125)
	ellipse(tx-5, ty+4, 12, 25);
	rect(tx-11, ty, 5, height-ty)
	fill(255)
	ellipse(tx-3, ty+2, 7, 15);
	fill(0, 250, 50, 30)
	rect(width/2-30, height-30, width/2+30, 30);	
	fill(255, 150)
	rect(width/2, height-15, width/2-30, 5);		
	fill(0)
	rect(width-2, 0, 2, height);
	rect(tx-6, height-2, width, 2);
	rect(width/2-30, height-30, 2, 30);
}

function addFriction(i){
	var v = prj[i].vel.mag()
	var d = v*v*(-.1)
	var dr = prj[i].vel.copy()
	dr.normalize()
	dr.mult(d)
	prj[i].addForce(dr)
}

function Projectile(){
	this.sz = random(15, 20)
	this.loc = createVector(tx, ty)
	this.vel = createVector(random(1),random(1))
	this.acc = createVector()
	this.angle = 11;
	this.angularVel = 0;
}

Projectile.prototype ={
	display:function(){
		fill(200,100,50, 200)
		var rotationFactor = round(this.vel.x*this.acc.y*100)/100
		push()
		translate(this.loc.x, this.loc.y)
		if(rotationFactor){
			this.angularVel = rotationFactor
			this.angle += this.angularVel
		}
		rotate(this.angle)
		this.angularVel = 0
		rect(-this.sz/2,-this.sz/2, this.sz-3, this.sz, 5)
		pop()	
	},
	update: function(){
		this.vel.limit(10)
		this.vel.add(this.acc)
		this.loc.add(this.vel)			
		this.acc.mult(0)
	},
	addForce: function(f){
		var frc = f.copy()
		this.acc.add(frc)
	},
	checkEdge: function(i){		
		if(this.loc.x > width-this.sz){
			this.loc.x = width-this.sz
			this.vel.x *= -.5
			addFriction(i)			
		}
		if(this.loc.y < this.sz){
			this.loc.y = this.sz
			this.vel.y *= -.5
			addFriction(i)	
		}
		if(this.loc.y > height-this.sz-2){
			this.loc.y = height-this.sz-2
			this.vel.y *= -.5
			addFriction(i)
		}
		
			/*
			for(var j=0; j< prj.length; j++){
			var vel = this.vel.mag()
			if(i!=j){
				var touched = this.sz/2 + prj[j].sz/2;					
				var distance = p5.Vector.dist(this.loc, prj[j].loc)
					if(distance<touched){
						this.vel.x *= -.8
						var thisVel = this.vel.mag(),
							thisMag = thisVel*this.sz
							
						var otherVel = prj[j].vel.mag();						
							otherMag = otherVel*prj[j].sz
							
							thisVel
							
							
						var	TotVel = TotVelVec.mag() - prj[j].vel.mag();
							this.vel.setMag(TotVel*this.sz/(this.sz+prj[j].sz))
							
						var TotVel = this.vel.x + prj[j].vel.x;			
						this.vel.x = (TotVel*this.sz/(this.sz+prj[j].sz))
						
						if(this.loc.x > prj[j].loc.x-this.sz){
							this.loc.x = prj[j].loc.x-this.sz;
						}
						if(this.loc.x < prj[j].loc.x+prj[j].sz+this.sz){
							this.loc.x = prj[j].loc.x+prj[j].sz+this.sz;
						}
						if(this.loc.y < (prj[j].loc.y+ prj[j].sz + this.sz)){
							this.loc.y = prj[j].loc.y+prj[j].sz+this.sz;
							addFriction(i)
						}
						if(this.loc.y > prj[j].loc.y-this.sz){
							this.loc.y = prj[j].loc.y-this.sz;
							addFriction(i)
						}
							
					} 
			}
		}*/
	}
}
function mousePressed(){
	var blast = createVector(random(4,7),-random(5,7))
	newPrj = new Projectile()
	prj.unshift(newPrj)
	newPrj.addForce(blast)
}
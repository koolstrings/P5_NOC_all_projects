var prj = [], tx = 250, ty = 400, an = 50, gravity, fric
function setup() {
	createCanvas(600, 400);
	gravity = createVector(0,.01)
}

function draw(){
	background(50,50);
	//noStroke()
	if(prj.length > 600){
		prj.length = 600
	}
	if(prj.length>0){
		for(var i=0; i< prj.length; i++){
			prj[i].update();
			prj[i].addForce(gravity)
			prj[i].checkEdge(i)
			prj[i].display();				
		}
	}
	if(frameCount%5 === 0){
		mousePressed()
	}
}


function addFriction(i){
	var v = prj[i].vel.mag()
	var d = v*v*(-.05)
	var dr = prj[i].vel.copy()
		dr.normalize()
		dr.mult(d)
		prj[i].addForce(dr)
}

function Projectile(){
	this.sz = random(2, 5)
	this.col = {r: random(100, 255), g: random(100, 255),b: 0}//random(100, 255),a: random(255)}
	this.loc = createVector(tx, ty)
	this.vel = createVector(0,0)
	this.acc = createVector()
	this.angle = an;
	this.angularVel = 0;
	this.angularAcc = 0;
}

Projectile.prototype ={
	display:function(){
		fill(this.col.r, this.col.g, this.col.b)
		//rect(this.loc.x, this.loc.y, 5,5)//this.sz, this.sz)
		ellipse(this.loc.x, this.loc.y, this.sz, this.sz)
	},
	update: function(){
	//	this.vel.limit(20)
		this.vel.add(this.acc)
		this.loc.add(this.vel)
		this.acc.mult(0)
		this.sz *= 1.002
	},
	addForce: function(f){
		var frc = f.copy()
		this.acc.add(frc)
	},
	checkEdge: function(i){		
		if(this.loc.x > width-this.sz){
			this.loc.x = width-this.sz
			this.vel.x *= -.2
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
	for(var i = 0; i< 10; i++){	
	var blast = createVector(random(-4,4),50)
		newPrj = new Projectile()
		prj.unshift(newPrj)	
		newPrj.addForce(blast)
	}
}
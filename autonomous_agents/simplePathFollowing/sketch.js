var path = [], pathRad = 35, normalPt, target, recordDist

function setup() {
	createCanvas(window.innerWidth, 500)
	createNewPath()
	seeker = new Seeker()	
	seeker.applyForce(createVector(random(-5,5), random(-5,5)))
	recordDist = 1000
}

function draw(){
	background(255)
	drawPath()
	seeker.update()
	seeker.checkEdge()
	seeker.display()
}

function Seeker(){
	this.loc = createVector(random(width), random(height))
	this.predictedLoc = createVector()
	this.vel = createVector()
	this.acc = createVector()
}


Seeker.prototype = {
	applyForce : function(f){
		this.acc.add(f)
	},
	display: function(){
		strokeWeight(1)
		fill('red')
		ellipse(this.loc.x, this.loc.y, 10)
		line(this.predictedLoc.x, this.predictedLoc.y, this.loc.x, this.loc.y)
		fill(0,0,255,50)
		ellipse(target.x, target.y, frameCount%5)
		ellipse(normalPt.x, normalPt.y, 10)	
		line(normalPt.x, normalPt.y, this.predictedLoc.x, this.predictedLoc.y)
		
	},
	update: function(){
		this.predictLoc()
		this.path()
		this.seek()
		this.vel.add(this.acc)
		this.vel.limit(2)
		this.loc.add(this.vel)
		this.acc.mult(0)
	},
	predictLoc: function(){
		var predict = this.vel.copy()
		var projectedLoc = predict.normalize().mult(25)
		projectedLoc.add(this.loc)
		this.predictedLoc = projectedLoc
	},
	path: function(){
		var start = path[0].copy() 
		var a = this.predictedLoc.copy().sub(start)
		var b = path[1].copy().sub(start)
		b.normalize()
		target = b.copy()
		var fact = a.dot(b)
		b.mult(fact)
		normalPt  = p5.Vector.add(start, b)
		target.mult(fact+125).add(start)
	},
	distance: function(){
		return dist(this.predictedLoc.x, this.predictedLoc.y, normalPt.x, normalPt.y)
	},
	seek: function(){
		var desired = target.copy()
		desired.sub(this.loc)
		
		var	maxSp = .1
		
		desired.normalize()	
		desired.limit(maxSp)
		if(this.distance() > pathRad){
			this.applyForce(desired)			
		}
	},
	checkEdge: function(){
		if(this.loc.x > width){
			this.loc.x = 0
			var yPos = this.loc.y - path[1].y
			this.loc.y = path[0].y + yPos
		}
		if(this.loc.x< 0){
			this.loc.x = width
		}
	}
}

function getDistance(prj, start, end){
	var a = p5.Vector.sub(prj, start)
	var b = p5.Vector.sub(end, start)
	b.normalize()
	var d = a.mag()*a.dot(b)
}


function createNewPath(){
	var pathNodes = 2;
	
	path[0] = createVector(0, random(height));
	path[pathNodes-1] = createVector(width, random(height))
}

function drawPath(){
	for(var i = 1; i< path.length; i++){	
		var prv = path[i-1],
			ths = path[i]
		stroke(0, 50)
		strokeWeight(1)
		line(prv.x, prv.y, ths.x, ths.y)
		stroke(100, 30)
		strokeWeight(pathRad*2)
		line(prv.x, prv.y, ths.x, ths.y)		
	}
}

function mousePressed(){
	seeker = new Seeker()	
	seeker.applyForce(createVector(random(-5,5), random(-5,5)))	
}
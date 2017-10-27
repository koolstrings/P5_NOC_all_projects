var path = [], pathRad = 25, recordDist, pathCount, seeker = [], seekers = 50

function setup() {
	createCanvas(window.innerWidth, 500)
	createNewPath()
	for(var i = 0; i< seekers; i++){	
		seeker[i] = new Seeker()	
		seeker[i].applyForce(createVector(random(-5,5), random(-5,5)))	
	}
}

function draw(){
	background(255)
	drawPath()
	for(var i = 0; i< seekers; i++){	
		seeker[i].update()
		seeker[i].checkEdge()
		seeker[i].display()
	}
}

function Seeker(){
	this.loc = createVector(random(width), random(height))
	this.predictedLoc = createVector()
	this.vel = createVector()
	this.acc = createVector()
	this.target = createVector()
	this.normalPt = createVector()
	this.recordDist = 1000
}


Seeker.prototype = {
	applyForce : function(f){
		this.acc.add(f)
	},
	display: function(){
		strokeWeight(1)
		fill(0,0,255)
		ellipse(this.loc.x, this.loc.y, 10)
		var pLoc = this.predictedLoc
		var objLoc = this.loc
		var tPt = this.target
		var nPt = this.normalPt
		if(dist(pLoc.x, pLoc.y, objLoc.x, objLoc.y)<100){
			line(pLoc.x, pLoc.y, objLoc.x, objLoc.y)
			fill(0, 10)
			stroke(0, 10)
			ellipse(tPt.x, tPt.y, 2)
			ellipse(nPt.x, nPt.y, 5)	
			line(nPt.x, nPt.y, pLoc.x, pLoc.y)	
		}		
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
		for(var i = pathCount-1; i>0; i--){
			if(this.predictedLoc.x > path[i-1].x && this.predictedLoc.x < path[i].x){
				var newNormal = this.getNormal(path[i-1], path[i])
				var newDist = newNormal.distance
				if(newDist<this.recordDist){				
					this.recordDist = newDist	
				}
				this.target = newNormal.thisTarget
				this.normalPt = newNormal.thisNormalPt
			}
		}
	},
	distance: function(){
		return dist(this.predictedLoc.x, this.predictedLoc.y, this.normalPt.x, this.normalPt.y)
	},
	seek: function(){
		var desired = this.target.copy()
		desired.sub(this.loc)
		
		var d = desired.mag(),
			maxSp = 1
		
		desired.normalize()	
		desired.limit(maxSp)
		if(this.distance() > pathRad){
			this.applyForce(desired)			
		}
	},
	checkEdge: function(){
		if(this.loc.x > width){
			this.loc.x = 0
			var yPos = this.loc.y - path[pathCount-1].y
			this.loc.y = path[0].y + yPos
		}
		if(this.loc.x< 0){
			this.loc.x = width
		}
	},
	getNormal: function(start, end){		
		var start = start.copy() 
		var a = this.predictedLoc.copy().sub(start)
		var b = end.copy().sub(start)
		var c = end.copy()

		b.normalize()
		thisTarget = b.copy()
		var fact = a.dot(b)
		b.mult(fact)
		thisNormalPt  = p5.Vector.add(start, b)
		var remaining = dist(end.x, end.y, c.x, c.y)
		thisTarget.mult(fact+15).add(start)
		
		return {
			thisTarget: thisTarget,
			thisNormalPt: thisNormalPt,
			distance: dist(this.predictedLoc.x, this.predictedLoc.y, thisNormalPt.x, thisNormalPt.y)
		}
	}
}

function createNewPath(){
	var pathNodes = round(random(4,10));
	pathCount = pathNodes
	path[0] = createVector(0, randomH());
	for(var i = 1; i< pathNodes-1; i++){	
		path[i] = createVector(random(width)/(pathNodes/2) + path[i-1].x, randomH());
	}
	path[pathNodes-1] = createVector(width, randomH())
}

function randomH(){
	return random(height/2-height/4, height/2+height/4)
}

function drawPath(){
	for(var i = 1; i< pathCount; i++){	
		var prv = path[i-1],
			ths = path[i]
		stroke(0, 50)
		strokeWeight(1)
		line(prv.x, prv.y, ths.x, ths.y)
		stroke(255,0,0, 10)
		strokeWeight(pathRad*2)
		line(prv.x, prv.y, ths.x, ths.y)		
	}
}

function mousePressed(){
	createNewPath()
}
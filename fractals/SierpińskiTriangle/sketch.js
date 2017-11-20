var trianglePts = []
function setup() {
	createCanvas(window.innerWidth, window.innerHeight)
	stroke(0,100,100)
	var len = width/12
	var heightOffset = height-len/2
	var leftPt = createVector(len*3, heightOffset)
		rightPt = createVector(len*9, heightOffset),
		traingleHeight = len*3*1.732,
		topPt = createVector(width/2, heightOffset-traingleHeight);
		
	trianglePts[0] = new Triangle(leftPt, rightPt, topPt);
	trianglePts[0].display()
}

function Triangle(leftPt, rightPt, topPt){
	this.leftPt = leftPt;
	this.rightPt = rightPt;
	this.topPt = topPt
}

Triangle.prototype = {
	display: function(){
		var l = this.leftPt,
			r = this.rightPt,
			t = this.topPt
		line(l.x, l.y, r.x, r.y)
		line(r.x, r.y, t.x, t.y)
		line(t.x, t.y, l.x, l.y)
	}
}

function mousePressed(){
	subDivideTriangles()
}

function subDivideTriangles(){
	var count = trianglePts.length
	var lastTriangle = trianglePts[count-1]
	var len = p5.Vector.dist(lastTriangle.leftPt, lastTriangle.rightPt)
	var newTriangles = []
	if(len > 5){
		for(var i = 0; i< count; i++){
			var lft = trianglePts[i].leftPt,
				rght = trianglePts[i].rightPt,
				tp = trianglePts[i].topPt
			var BottomMid = createVector((lft.x + rght.x)/2, (lft.y + rght.y)/2)
			var leftMid = createVector((lft.x + tp.x)/2, (lft.y + tp.y)/2)
			var rightMid = createVector((rght.x + tp.x)/2, (rght.y + tp.y)/2)
			newTriangles.push(new Triangle(tp.copy(), leftMid, rightMid))
			newTriangles.push(new Triangle(rght.copy(), rightMid, BottomMid))
			newTriangles.push(new Triangle(lft.copy(), leftMid, BottomMid))
		}
		trianglePts = newTriangles
		showAll()
	}
}

function showAll(count){
	background(255)
	var count = trianglePts.length
	for(var i = 0; i< count; i++){
		trianglePts[i].display()		
	}
}


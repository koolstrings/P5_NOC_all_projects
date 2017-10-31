var len, kochLinesArray = [];

function setup() {
	createCanvas(window.innerWidth, window.innerHeight);
	len  = width;
	kochLinesArray.push(new KochLine(createVector(200,2*height/3), createVector(width-200,2*height/3)))
	showAll()
}

function KochLine(start, end, col){
	this.start = start;
	this.end = end
	this.col = col || 0
}

KochLine.prototype = {
	display: function(){
		stroke(this.col)
		line(this.start.x, this.start.y, this.end.x, this.end.y)
	}
}

function createKochLines(){
	var nextKochLinesArray = [],
		lineLength = p5.Vector.dist(kochLinesArray[0].start, kochLinesArray[0].end)
	if(lineLength > 1){	
		for(var i = 0; i< kochLinesArray.length; i++){
			var kl = kochLinesArray[i],
				s = kl.start.copy(),
				e = kl.end;
			var newLineMag = lineLength/3;
			var bk1 = e.copy().sub(s).div(3).setMag(newLineMag).add(s);
			var trianglePt = e.copy().sub(s).div(3).rotate(-PI/3).setMag(newLineMag).add(bk1);
			var bk2 = e.copy().sub(s).div(3).setMag(newLineMag*2).add(s);
				
				//START POINT
				nextKochLinesArray.push(new KochLine(s, bk1,'green'))
				//NEXT POINT
				//trianglePt.sub(s).rotate(radians(60))
				
				nextKochLinesArray.push(new KochLine(bk1, trianglePt, 'red'))
				nextKochLinesArray.push(new KochLine(trianglePt, bk2, 'red'))
				nextKochLinesArray.push(new KochLine(bk2, e, 'green'))
		}
		kochLinesArray = nextKochLinesArray	
	}
	background(255)
	showAll()
}

function showAll(){
	for(var i = 0; i< kochLinesArray.length; i++){
		kochLinesArray[i].display()
	}
}

function mousePressed(){
	createKochLines()
}
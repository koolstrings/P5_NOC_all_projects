var len, kochLinesArray = [];

function setup() {
	createCanvas(window.innerWidth, window.innerHeight);
	len  = width;
	kochLinesArray.push(new KochLine(createVector(0,200), createVector(width,200)))
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
	if(lineLength > width/50){	
		for(var i = 0; i< kochLinesArray.length; i++){
			var kl = kochLinesArray[i],
				s = kl.start.copy(),
				e = kl.end,
				bk1 = createVector((s.x+e.x)/3, (s.y+e.y)/3),	
				trianglePt = createVector((s.x+e.x)/2, (s.y+e.y)/2)
				bk2 = createVector(2*(s.x+e.x)/3, 2*(s.y+e.y)/3);
				
				//START POINT
				nextKochLinesArray.push(new KochLine(s, bk1))
				//NEXT POINT
				trianglePt.sub(s).rotate(radians(60))
				
				nextKochLinesArray.push(new KochLine(bk1, trianglePt, 'red'))
				nextKochLinesArray.push(new KochLine(trianglePt, bk2))
				nextKochLinesArray.push(new KochLine(bk2, e))
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
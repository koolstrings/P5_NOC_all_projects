var rad, atX
function setup() {
	createCanvas(window.innerWidth, window.innerHeight)
	background(0,100,100)
	rad = min(width, height)*2
	atX = width
	atY = 1
	//noFill()
	noStroke()
	//stroke(0,100,100,25)
	fill(55,255,255,15)
	createCircles()
}

function createCircles(){
	if(rad>.1){
		ellipse(atX,atY,rad)
		ellipse(width-atX,atY,rad)
		ellipse(atX,atY,rad*2)
		ellipse(width-atX,atY,rad*2)
		atX *= .95
		atY *= 1.001
		rad *= .9
		createCircles()
	}
}


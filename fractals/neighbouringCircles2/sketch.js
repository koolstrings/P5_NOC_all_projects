var rad, atX
function setup() {
	createCanvas(window.innerWidth, window.innerHeight)
	//background(0)
	rad = min(width, height)
	atX = width/2
	atY = height/2
	stroke(100)
	noFill()
	createCircles(atX,atY,rad)
}

function createCircles(x,y,r){
	ellipse(x,y,r)
	if(r>10){
		createCircles(x+r/2,y,r/2)
		createCircles(x-r/2,y,r/2)
		createCircles(x,y+r/2,r/2)
		createCircles(x,y-r/2,r/2)
		
	}
}


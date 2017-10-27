var theta = 0, r = 0, lastX = 0, lastY = 0, c = 0

function setup() {
	createCanvas(400, 400)
	background(0)
}

function draw() {
	translate(width/2, height/2)
	noFill()
	//fill(0,255,0,1)
	random()>random()?stroke(255, 0, 0,80):stroke(255, 255, 0,80)
	
	var x = r*sin(theta),
		y = r*cos(theta);
		
	//ellipse(x,y,5)	
	ellipse(x,y,lastX, lastY)
	//line(x,y,lastX, lastY)
	lastX = x;
	lastY = y;
	
	if(x < width || y < height){
		theta+= .1
		r+= .1
	}
}

var angularVel = 0, angle = 0, angAcc = .001
function setup() {
	createCanvas(800, 800)
}

function draw() {
	background(255)
	translate(height/2, width/2)
	angularVel += angAcc
	angle += angularVel
	rotate(angle)
	line(-50,0,50,0)
	ellipse(50,0,8,8);
	ellipse(-50,0,8,8);
}

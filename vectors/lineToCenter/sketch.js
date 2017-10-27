function setup() {
	createCanvas(800, 400)
}

function draw() {
	background(180)
	var mouse = createVector(mouseX, mouseY)
	var center = createVector(width/2,height/2)
	mouse.sub(center)
	mouse.mult(0.5)
	translate(width/2, height/2)
	line(0, 0, mouse.x, mouse.y)
}

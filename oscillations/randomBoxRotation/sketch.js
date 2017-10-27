var r,s,e,c, o
function setup() {
	createCanvas(400, 400);
	r = 5;
	s = 10;
	e = 1;
	c = 20
	o = 25
}

function draw(){
	background(240);
	fill(100, o);
	noStroke()
	//stroke(0, 160);
	
	translate(width/2, height/2);
	
	for (var i=0; i < c; i++) {
		push();
		rotate(i / r);
		scale(i / s);
		ellipse(e, e, 100,20);
		pop();
	}
}

function mousePressed(){
	r = round(random(5));
	s = round(random(10));
	e = round(random(1));
	c = round(random(50))
	o = round(random(50))
}

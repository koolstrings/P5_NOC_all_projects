var treeBranches = [], theta

function setup() {
	createCanvas(window.innerWidth, window.innerHeight)
	noFill()
}

function draw() {
  background(255);
  theta = map(mouseY,0,height,-PI/2,0);
  translate(width/2, height);
  stroke(0);
  branch(100);
}

function branch(len){
	if(len < 10){
		stroke('green')
		ellipse(0, 0, len)
	}else{		
		stroke('red')
		line(0, 0, 0, -len);
	}
	translate(0, -len);
	strokeWeight(len/10)
	len *= 0.66
	if(len > 4){
		push();
		rotate(theta);
		branch(len)
		pop()
		 
		push()
		rotate(-theta);
		branch(len)
		pop();
	}
}
var len
function setup() {
	createCanvas(window.innerWidth, window.innerHeight);
	len = width;
	//stroke(100);
	background(0,55,100)
	fill(150,0,0)
	noStroke()
	createLines(10,10,len-20);
}

function createLines(x,y,r){
	rect(x,y,r,50);
	if(r>.0001){
		y += 51
		createLines(x,y,r/3);
		createLines(r*2/3+x,y,r/3);
	}
}


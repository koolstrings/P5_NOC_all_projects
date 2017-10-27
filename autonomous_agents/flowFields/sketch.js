var bb = [], res = 800
function setup() {
	createCanvas(window.innerWidth,window.innerHeight)
	background(250, 100, 0)
	//noStroke()
	var cols = width/res,
		rows = height/res
	for(var i =0; i< cols; i++){
		for(var j =0; j< rows; j++){
			b = new BBB(res/2+res*i,res/6+res*j)
			bb.push(b)			
		}	
	}
}

function draw() {
	strokeWeight(5)
	background(250, 100, 0)
	for(var i = 0; i< bb.length; i++){	
		bb[i].update(mouseX, mouseY)
		bb[i].display()	
	}
}

function BBB(x,y){
	this.loc = createVector(x,y);
	this.angle = 0;	
}

BBB.prototype = {	
	display : function(){
		push()
		translate(this.loc.x, this.loc.y)
		//console.log(this.angle)
		rotate(this.angle)
		if(dist(this.loc.x, this.loc.y, mouseX, mouseY) < res/4){
			fill(255, 0,0)
			ellipse(0,0,res/2)
			fill(255)
		}else{
			fill(255)
			ellipse(0,0,res/2)
			fill(150,50,0)
		}
		strokeWeight(1)
		ellipse(0,res/10,res/4)
		fill(0)
		ellipse(0,res/10,3*res/16)
		noStroke()
		fill(255, 100)
		ellipse(res/10,res/8,res/16)
		pop()
	},
	update(x,y){
		this.angle = -atan2(x-this.loc.x, y-this.loc.y)
	}
}

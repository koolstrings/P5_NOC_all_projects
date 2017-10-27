var osc = [], count = 40, offset, pallet
function setup() {
	createCanvas(500, 400)
	for(var i = 0; i< count; i++){
		osc[i] = new Oscilator(i)
	}
	offset = 5,
	pallet = 255/count
	strokeWeight(2)
	//fill(100,200)
}

function draw() {
	background(0,100,100)
	//noFill()
	//noStroke()
	translate(0, height/2)
	for(var i = 0; i< count; i++){
		osc[i].update()
		osc[i].display(i)
	}
}


function Oscilator(i){
	this.Xloc = (width-20)/count*i;
	this.Yloc = 0;
	this.angle = i/20;
	this.angularVel = .005
}

Oscilator.prototype = {	
	display: function(i){
		fill(i%2?i:5*i,5*i,i,10*i)
		stroke(0,150,150,8*i)
		var n = noise(this.angle)
		var r = random(n)
		this.Yloc = height/2*n + random(r)
		//if(i>0){
		//	line(this.Xloc+offset, this.Yloc, osc[i-1].Xloc+offset, osc[i-1].Yloc)
		//}
			ellipse(this.Xloc+offset, this.Yloc, 10+2*i,10+i)
			fill(200,8*i)
			ellipse(this.Xloc+offset, this.Yloc+i/2+2, i,5)
			if(i==count-1){
				fill(0,150,150,8*i)
				ellipse(this.Xloc+offset, this.Yloc+15, i, i/2)
				fill(250)
				stroke(0)
				ellipse(this.Xloc-10, this.Yloc-10, 10, 15-n*15)
				ellipse(this.Xloc+20, this.Yloc-10, 10, 15-n*15)
				fill(55,0,0)
				ellipse(this.Xloc-10, this.Yloc-10, 3)
				ellipse(this.Xloc+20, this.Yloc-10, 3)
				ellipse(this.Xloc+5, this.Yloc+15, 30, 10-n*15)
			}
	},
	update: function(){
		this.angle += this.angularVel
	}
}
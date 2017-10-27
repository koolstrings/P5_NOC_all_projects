var bubble = [], count = 100

function setup() {
	createCanvas(window.innerWidth,window.innerHeight)
	for(var i = 0; i< count; i++){
		bubble.push(new Balloon())		
	}
	stroke(90,90,0)
}

function draw(){
	background(0,155,155)
	var bCount = bubble.length
	for(var i = bCount-1; i>=0; i--){
		var b = bubble[i]
		if(b.keepGrowing){
			b.grow(i)
		}
		b.display()
	}
}

function Balloon(){
	this.loc = createVector(random(width), random(height));
	this.rad = 0
	this.vel = createVector()
	this.growthRate = round(random()*10)/10
	//this.stroke = {r:0,g:0,b:0}
	//this.fill = {r:random(255),g:random(255),b:random(255)}
	this.keepGrowing = true
}

Balloon.prototype = {
	grow :function(i){
			this.rad += this.growthRate			
			this.canGrow(i)
	},
	display: function(){
		//stroke(this.stroke.r,this.stroke.g,this.stroke.b,100)
		//fill(this.fill.r,this.fill.g,this.fill.b)
		noFill()
		//if(this.rad > 20){		
			ellipse(this.loc.x, this.loc.y, this.rad*2)	
		//}
	},
	canGrow: function(j){
		var bCount = bubble.length
		for(var i = bCount-1; i>=0; i--){
			if(i!==j){
				if(checkCollision(i, j)){
					this.keepGrowing = false
					createNewBubble()
					break;					
				}
			}
				
		}
	}
}

function checkCollision(testBubble,j){	
		var iB = bubble[testBubble] || testBubble
		var jB = bubble[j]
		return (dist(iB.loc.x,iB.loc.y, jB.loc.x,jB.loc.y) < (iB.rad+jB.rad+2))
}
function createNewBubble(){
	var bCount = bubble.length
	if(bCount<1000){
	var newBubble = new Balloon()
		for(var i = bCount-1; i>=0; i--){
			if(checkCollision(newBubble, i)){
				createNewBubble()
				return;
			}
			if(i == 0){				
				bubble.push(newBubble)
				return;
			}
			
		}
	}
}
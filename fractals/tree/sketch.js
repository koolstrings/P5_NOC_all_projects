var treeBranches = []

function setup() {
	createCanvas(window.innerWidth, window.innerHeight)
	var rootStart = createVector(width/2,height)
	var rootEnd = createVector(random(3*width/7, 4*width/7),height - 100)
	treeBranches.push(new Branch(rootStart, rootEnd))
}

function Branch(st, en){
	this.start = st;
	this.end = en;
	this.len = p5.Vector.dist(st, en);
	this.angle = PI;
	this.isNode = true;
	this.stroke = 'maroon';
	this.fill =  'maroon'
}

Branch.prototype.display = function(){
	var st = this.start,
		en = this.end;
	strokeWeight(max(this.len/9, 1));
	//strokeWeight(2);
	
	stroke(this.stroke);
	fill(this.fill);
	if(this.len < 3){
		stroke(0,100,50)
		ellipse(st.x, st.y, this.len*2)
	}else{		
		line(st.x, st.y, en.x, en.y)
	}
}

function mousePressed(){
	addBranches()
}

function addBranches(){
	var count = treeBranches.length+1
	var newTreeBranches = treeBranches
	if(count < 10000){			
		for(var i = 1; i< count; i++){
			var prevBranch = treeBranches[i-1]
			if(prevBranch.isNode == true){
				var prevBranchEnd = prevBranch.end;
				var newBranchHieght = prevBranch.len*.95
				newBranchCount = round(random(3))
				for(var j = 0; j< newBranchCount; j++){				
					var br = createVector(0,newBranchHieght).rotate(random(-5,5)).setMag(random(newBranchHieght/2, newBranchHieght)).add(prevBranchEnd);	
					newTreeBranches.push(new Branch(prevBranch.end.copy(), br))
				}
				treeBranches[i-1].isNode = false;
			}		
		}
	}
	treeBranches = newTreeBranches
	background(255)
	showAll()
}

function showAll(){	
	for(var i = 0; i< treeBranches.length; i++){		
	var tBranch = treeBranches[i]
		if(tBranch.len < 10){			
			tBranch.fill = 'green';
			//tBranch.stroke = 100;
		}
		tBranch.display()		
	}
}
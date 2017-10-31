var cellGrid = [], cellSize = 6, rows, cols

function setup() {
	createCanvas(window.innerWidth, window.innerHeight)
	cols = width/cellSize
	rows = height/cellSize
	//noStroke()
	stroke(0,20,20)
	for(var i = 0; i < rows-1; i++){
		var colsAtRows = []
		for(var j = 0; j < cols-1; j++){
			var s = round(random(1)*random(1))	
			colsAtRows.push(new Cell(i,j,s))
		}
		cellGrid.push(colsAtRows)
	}
	displayCells()
}

function draw() {
	background(80,20,20)
	displayCells()
	//if(frameCount%2 == 0){
	checkNextOrder()
	//}
}

function drawFrame(){
	noFill()
	strokeWeight(cellSize*2)
	rect(0,0,width,height)
	strokeWeight(1)
	fill(250,200,200)
}

function displayCells(){
	var i, j
	for(i = 1; i < rows-1; i++){
		line(0, i*cellSize, width, i*cellSize)
		for(j = 1; j < cols-1; j++){
			if(i == 1){
				line(j*cellSize, 0, j*cellSize, height)
			}
			cellGrid[i][j].display()
		}
	}
	drawFrame()
}



function checkNextOrder(){
	var i, j
	var nextCellGrid = []
	for(i = 0; i < rows-1; i++){
		var newColsAtRows = []
		for(j = 0; j < cols-1; j++){
			newColsAtRows[j] = cellGrid[i][j].getNextState(i,j)
		}
		nextCellGrid.push(newColsAtRows)
	}
	cellGrid = nextCellGrid
}

function Cell(i,j, s){
	this.loc = createVector(j*cellSize, i*cellSize)
	this.state = s
}

Cell.prototype = {
	display: function(){
		var loc = this.loc
		if(this.state){
			rect(loc.x, loc.y, cellSize, cellSize,cellSize/4)			
		}
	},
	getNextState: function(i,j){		
		if(i <= 0 || j <= 0 || i >= rows-2 || j >= cols-2){
			return this
		}else{		
			var r = this.checkNeighbours(i,j), nextState
			if(r < 2 || r > 3){
				nextState = 0
			}else if(r == 3){
				nextState = 1	
			}else if(r == 2){
				nextState = this.state
			}
			var nextCell = new Cell(i,j,nextState)
			return nextCell	
		}
	},
	checkNeighbours: function(i,j){
		var n1 = cellGrid[i-1][j-1].state,
			n2 = cellGrid[i-1][j].state, 
			n3 = cellGrid[i-1][j+1].state, 
			n4 = cellGrid[i][j-1].state, 
			n5 = cellGrid[i][j+1].state, 
			n6 = cellGrid[i+1][j-1].state, 
			n7 = cellGrid[i+1][j].state, 
			n8 = cellGrid[i+1][j+1].state
		return n1 + n2 + n3 + n4 + n5 + n6 + n7 + n8
	}
}

function mousePressed(){
	var x = round(mouseX/cellSize-1)
	var y = round(mouseY/cellSize-1)
	var c = cellGrid[y][x]
	if(c){
		c.state = 1
	}
}

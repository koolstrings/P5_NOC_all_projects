var cellWidth = 0, rows = 0, cols = 0, cells = [], prevRow = []
function setup() {
	createCanvas(window.innerWidth, window.innerHeight)
	cellWidth = getCellW(width, height)
	rows = round(height/cellWidth)
	cols = round(width/cellWidth)
	for(var r = 0; r < rows-1; r++){
		initiateCells(r)
	}
}

function initiateCells(r){
	var colAtR = []
	var rc
	for(var c = 0; c < cols-1; c++){		
		if(r == 0){
			if(c == round(cols/2)){
				rc = 1
			}
			else{
				rc = 0
			}
		}else{
			rc = getCell(c)
		}
		colAtR[c] = rc
		var rh = r*cellWidth			
		fill(255-rc*155)
		stroke((1-rc)*255)
		rect(c*cellWidth,rh,cellWidth,cellWidth)
	}
	prevRow = colAtR
}

function getCell(c){
	var prevCell, nextCell, tCell;
	tCell = prevRow[c]
	prevCell = (c-1 < 0)? tCell: prevRow[c-1]
	nextCell = (c+1 > cols-2)? tCell: prevRow[c+1]
	if(prevCell !==  nextCell){
		return 1
	}else{
		return 0	
	}
}

function getCellW(a,b){
	var res = a%b
	return res? getCellW(b,res): min(a,b)
}

var strArray = "qwertyuiopasdfghjklzxcvbnm `1234567890~!@#$%^&*()_+QWERTYUIOPASDFGHJKLZXCVBNM,./;'[]\\<>?:\"{}|".split('');
//var strArray = "qwertyuiopasdfghjklzxcvbnm QWERTYUIOPASDFGHJKLZXCVBNM".split('');
var strArray = "qwertyuiopasdfghjklzxcvbnm ".split('');
var truncatedTarget = false
var strArrayLen = strArray.length,
	population = [], matingPool = [],
	target = prompt("enter a string: only alphabets and space allowed", "to be or not to be");
	
	if(target.length > 18){
		var temp = target.substring(0,17)
		target = temp
		truncatedTarget = true
	}
	
var geneLen = target.length;
var popLen = 100;
var mutationRate = .05;
var generationFitness = 0;
var closestMatch = {};
var closestGeneration = 0
var loops = 0;
var textXPosition;
var keepRunning = true;
var xOffSet;

function setup() {
	createCanvas(window.innerWidth, window.innerHeight);
	textXPosition = width/2- 200
	for(var i = 0 ; i < popLen ; i++){
		var baseGeneStr = "";
		for(var g = 0 ; g < geneLen ; g++){
			baseGeneStr += strArray[round(random(strArray.length-1))]
		}
		population.push(new Gene(baseGeneStr))
	}
	closestMatch = population[0]
	xOffSet = geneLen*13.3 + 10
}

function draw(){
	background(255)
	text("Click on page to "+(keepRunning? "Pause": "Resume"), 10,30)
	loops++;
	growMatingPool();
	generateNextGrowth();
	showUpdate()
	loops > 19999 && noLoop()
}
function showUpdate(){
	text("Target: "+target+(truncatedTarget?" (truncated to 18 characters)": ""), textXPosition, height/4-20)
	var foundAt = findMatch()
	if(foundAt){
		text("found at "+ (foundAt+1) +" in "+loops+" tries !!!!!", textXPosition, height/4)
		noLoop();
	}else{
		text("Latest & closest match was found in generation: "+closestGeneration+" : "+closestMatch.val, textXPosition, height/4)
		text("Matching "+closestMatch.matching+" characters in "+geneLen, textXPosition, height/4+20)
	}

}

function mousePressed(){
	keepRunning = !keepRunning
	keepRunning? loop(): noLoop()
}

function growMatingPool(){
	//matingPool = []
	for(var i = 0 ; i < popLen ; i++){
		var chances = population[i].fitness //generationFitness 
		//if(i && population[i].val != population[i-1].val){
			for(var y = 0; y < chances; y++){
				matingPool.push(population[i])
			}			
		//}
	}
	generationFitness = 0;
}

function generateNextGrowth(){
	var parentsCount = matingPool.length-1;
	var textX = 10, textY = height-10;
	population = [];
	for(var i = 0 ; i < popLen ; i++){
		var p1 = matingPool[round(random(parentsCount))];
		var p2 = matingPool[round(random(parentsCount))]
		var childGene = new Gene(p1.reproduce(p2))
		
		if(i<100){
			text(i+1 +" "+childGene.val, textX, textY)
			if(textX > width-1.5*xOffSet){
				textX = 10
				textY -= 20
			}else{
				textX += xOffSet
			}
		}
		
		population.push(childGene)
	}
	text("first 100 of total "+popLen+" genes in generation: "+loops, 10, textY-20)
}
function findMatch(){
	for(var i = 0 ; i < popLen ; i++){
		var thisOne = population[i]
		if(thisOne.matchTarget()){
			return i
		}else if(thisOne.fitness >= closestMatch.fitness){
			closestMatch = thisOne;
			closestGeneration = loops		
		}
	}
	return false
}

function Gene(gString){
	this.val = this.afterMutation(gString);
	this.matching = this.matching();
	this.fitness = this.getFitness()
}

Gene.prototype = {
	afterMutation: function(gString){
		var mutatedStr = gString
		for(var i = 0; i< geneLen; i++){
			if(random()<mutationRate){
				mutatedStr[i] = strArray[round(random(strArray.length-1))]
			}
		}
		return mutatedStr
	},
	matching: function(){		
		var f = 0, thisVal = this.val;
		for(var i = 0; i< geneLen; i++){
			if(thisVal[i] === target[i]){
				f++
			}
		}
		return f;
	},
	getFitness: function(){
		var f = this.matching + 1;
		var geneFitness = f*f;
		generationFitness += geneFitness
		return geneFitness
	},
	reproduce: function(otherGene){
		var childGene = "";		
		for(var i = 0; i< geneLen; i++){
			if(random()>.5){
				childGene += this.val[i]
			}else{
				childGene += otherGene.val[i]
			}
		}
		
		return childGene
	},
	matchTarget: function(){
		return this.val === target//.toLowerCase()
	}
}
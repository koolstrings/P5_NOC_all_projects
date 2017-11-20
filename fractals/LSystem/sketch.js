function LSystem(str){
	console.log(str)
	if(str.includes('A') || str.includes('B')){
	    var ruleStr = ""
		for(var i = 0; i< str.length; i++){
			if(str[i] == 'B'){
				ruleStr += 'A'
			}else if(str[i] == 'A'){
				ruleStr += 'AB'
			}else{
				ruleStr += str[i]
			}
		}
		if(str.length < 50){
			LSystem(ruleStr)
		}
		console.log(ruleStr)
	}
}

LSystem('A')
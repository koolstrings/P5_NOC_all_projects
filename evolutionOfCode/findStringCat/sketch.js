(function(){
	var str = "abcdefghijklmnopqrstuvwxyz";
	var strArr = str.split('');
	var strWord = "";
	var attempt = 0;
	var bestMatch = "";
	var bestAttempt = 0;
	function getWord(passedStrWord){
		//console.clear()
		//console.log('searching...')
		var r = Math.round(Math.random()*100%25)
		++attempt;
		strWord = passedStrWord || ""
		strWord += str[r];
		//console.log(strWord)
		var strLen = strWord.length
		if(strLen > 2){
			if(strWord === "cat"){
				console.clear()
				console.log("Found in attempt number: "+attempt+"\n "+strWord)
			}else{
				nextCallToGetWord()
			}
		}else{
			if(strLen == 1 && strWord == 'c' || strLen == 2 && strWord == 'ca'){
				if(strLen > bestMatch.length){
					bestMatch = strWord;
					bestAttempt = attempt
				}
				console.clear()
				console.log('best so far...   \"' +bestMatch + '\" on attempt number '+bestAttempt+'. Total attempts: '+attempt)
				nextCallToGetWord(strWord)
			}else{
				nextCallToGetWord()
			}
				
		}
	}
	function nextCallToGetWord(wrd){
		var w = wrd || ""
		setTimeout(function(){getWord(w)}, 0)
	}
	getWord()
})()
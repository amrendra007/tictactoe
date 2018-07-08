//created by Amrendra kumar 
var blk = document.querySelectorAll(".blk");
var defendChecker = "undefend";
var attackChecker = "unattack";
var firstTurn = 0;
var userMiddleTurn = 0;
var deadZoneTurn = 0;
var commonBlocker = 0;
var clickPreventer = 0;
var diagonalDeadZone1 = 0;
var diagonalDeadZone2 = 0;
var AI = document.getElementById("AI");
var HUMAN = document.getElementById("HUMAN");
var toggle = document.getElementById("toggle");
var updateMessage = document.getElementById("updateMessage");

var gameOver = false;
toggle.style.display = "none";
var humanScore = 0;
var AIScore = 0;
var array = [ ];

function random(min,max) {
	return Math.floor(Math.random()*(max -min) + min);
}
for(let i = 0; i < blk.length; i++) {
	blk[i].addEventListener("click",inIt);
}
function inIt() {
	if(this.value !== "x" && this.value === " " && gameOver === false && clickPreventer === 0) {
		this.value = "0";
        clickPreventer = 1;
        //cheacking human wining condition
		if(winningCombination("0")) {
			gameOver = true;
            humanScore += 1;
			HUMAN.textContent = "YOU(O) - " + humanScore;
            toggle.style.display = "block";
            updateMessage.textContent = "Congratulation ! you won.";
            setTimeout(resetGame,1500);
        }
		//checking for game draw
		else if (vacantChecker() && !winningCombination("0") && !winningCombination("x") ) {
			gameOver = true;
            toggle.style.display = "block";
            updateMessage.textContent = "Well tried, It's draw.";
            setTimeout(resetGame,1500);
        }
		if(gameOver === false) {
			AIplay();
		}
    }

}
function AIplay() {
	defendChecker = "undefend";
	if (firstTurn === 0 && blk[4].value === " ") {
		markAndCheck(blk[4]);
		firstTurn = 1;
	} else {
		firstTurn = 2;
	}
	//when user select middle box , how ai respond intell.
	if (userMiddleTurn === 0 && blk[4].value === "0" && blk[6].value === " ") {
		markAndCheck(blk[6]);
		userMiddleTurn = 1;
	} else {
		userMiddleTurn = 2;
	}
	//Attacking code , check for two "x" and mark third if find
	if (attackOrDefend("x")) {
		attackChecker = "attacked";
	}
	//Defending code , check for two "0" and mark third if find
	if (attackChecker !== "attacked" && attackOrDefend("0")) {
		defendChecker = "defended";
	}

	//============diagonalldeadzone1======================
	if (blk[6].value === "0" && blk[2].value === "0" && blk[4].value === "x" && blk[0].value === " " && blk[1].value === " " && blk[3].value === " " && blk[5].value === " " && blk[7].value === " " && blk[8].value === " ") {
		markAndCheck(blk[5]);
		diagonalDeadZone1 = 1;
	} else {
		diagonalDeadZone1 = 2;
	}

	//=============diagonal deadzone2================
	if (blk[0].value === "0" && blk[8].value === "0" && blk[4].value === "x" && blk[1].value === " " && blk[2].value === " " && blk[3].value === " " && blk[5].value === " " && blk[6].value === " " && blk[7].value === " ") {
		markAndCheck(blk[3]);
		diagonalDeadZone2 = 1;
	} else {
		diagonalDeadZone2 = 2;
	}

	//Deadzonemiddle condition x on 6 and 0 on pos 4 , 2
	if (blk[6].value === "x" && blk[4].value === "0" && blk[2].value === "0" && blk[0].value === " " && blk[1].value === " " && blk[3].value === " " && blk[5].value === " " && blk[7].value === " " && blk[8].value === " ") {
		markAndCheck(blk[0]);
		deadZoneTurn = 1;
	} else {
		deadZoneTurn = 2;
	}

	//===========================Running code for vacant position====================
	if (defendChecker === "undefend" && attackChecker !== "attacked" && (firstTurn === 2 || firstTurn != 1) && (userMiddleTurn === 2 || userMiddleTurn != 1) && (deadZoneTurn === 2 || deadZoneTurn != 1) && (diagonalDeadZone1 === 2 || diagonalDeadZone1 != 1) && (diagonalDeadZone2 === 2 || diagonalDeadZone2 != 1)) {
		//======blocking common position created by user side by side======
		if (commonBlocker === 0 && blk[6].value === " " && (blk[0].value === "0" || blk[3].value === "0") && (blk[7].value === "0" || blk[8].value === "0")) {
			commonBlocker = 1;
			markAndCheck(blk[6]);

		}
		else if (commonBlocker === 0 && blk[8].value === " " && (blk[6].value === "0" || blk[7].value === "0") && (blk[5].value === "0" || blk[2].value === "0")) {
			commonBlocker = 1;
			markAndCheck(blk[8]);
		}
		else if (commonBlocker === 0 && blk[2].value === " " && (blk[8].value === "0" || blk[5].value === "0") && (blk[0].value === "0" || blk[1].value === "0")) {
			commonBlocker = 1;
			markAndCheck(blk[2]);

		}
		else if (commonBlocker === 0 && blk[0].value === " " && (blk[1].value === "0" || blk[2].value === "0") && (blk[3].value === "0" || blk[6].value === "0")) {
			commonBlocker = 1;
			markAndCheck(blk[0]);
		}
		else {
			//marking on random pos
			for (let i = 0; i < blk.length; i++) {
				if (blk[i].value === " ") {
					array.push(blk[i]);
				}
			}
			//marking on random location
			let vacantPos = random(0, array.length);
			markAndCheck(array[vacantPos]);
		}
	}
}

function vacantChecker() {
	for(let i = 0 ; i < blk.length; i++) {
		if(blk[i].value === " ") {
			return false;
		}
	}
	return true;
}

function winningCombination(bit) {
	//checking horizontally
	if(blk[0].value === bit && blk[1].value === bit && blk[2].value === bit) {
		colorGreen(blk[0], blk[1], blk[2]);
	}
	else if(blk[3].value === bit && blk[4].value === bit && blk[5].value === bit) {
		colorGreen(blk[3], blk[4], blk[5]);
	}
	else if(blk[6].value === bit && blk[7].value === bit && blk[8].value === bit) {
		colorGreen(blk[6], blk[7], blk[8]);
	}
	//checking vertically
	else if(blk[0].value === bit && blk[3].value === bit && blk[6].value === bit) {
		colorGreen(blk[0], blk[3], blk[6]);
	}
	else if(blk[1].value === bit && blk[4].value === bit && blk[7].value === bit) {
		colorGreen(blk[1], blk[4], blk[7]);
	}
	else if(blk[2].value === bit && blk[5].value === bit && blk[8].value === bit) {
		colorGreen(blk[2], blk[5], blk[8]);
	}
	//checking diagonally
	else if(blk[0].value === bit && blk[4].value === bit && blk[8].value === bit) {
		colorGreen(blk[0], blk[4], blk[8]);
	}
	else if(blk[6].value === bit && blk[4].value === bit && blk[2].value === bit) {
		colorGreen(blk[6], blk[4], blk[2]);
	}
	else {
		return false;
	}
	return true;
}

function colorGreen(blk1, blk2, blk3) {
	blk1.style.color = 'green';
	blk2.style.color = 'green';
	blk3.style.color = 'green';
}

function attackOrDefend(bit) {
	//==========================checking horizontall======================
	//First hrline
	if(blk[0].value === bit && blk[1].value === bit && blk[2].value === " ") {
		markAndCheck(blk[2]);
	}
	else if(blk[1].value === bit && blk[2].value === bit && blk[0].value === " ") {
		markAndCheck(blk[0]);
	}
	else if(blk[0].value === bit && blk[2].value === bit && blk[1].value === " ") {
		markAndCheck(blk[1]);
	}
	//Second hrline
	else if(blk[3].value === bit && blk[4].value === bit && blk[5].value === " ") {
		markAndCheck(blk[5]);
	}
	else if(blk[4].value === bit && blk[5].value === bit && blk[3].value === " ") {
		markAndCheck(blk[3]);
	}
	else if(blk[3].value === bit && blk[5].value === bit && blk[4].value === " ") {
		markAndCheck(blk[4]);
	}
	//Third hrline
	else if(blk[6].value === bit && blk[7].value === bit && blk[8].value === " ") {
		markAndCheck(blk[8]);
	}
	else if(blk[7].value === bit && blk[8].value === bit && blk[6].value === " ") {
		markAndCheck(blk[6]);
	}
	else if(blk[6].value === bit && blk[8].value === bit && blk[7].value === " ") {
		markAndCheck(blk[7]);
	}
	//==========================checking vertically======================
	//First vrline
	else if(blk[0].value === bit && blk[3].value === bit && blk[6].value === " ") {
		markAndCheck(blk[6]);
	}
	else if(blk[3].value === bit && blk[6].value === bit && blk[0].value === " ") {
		markAndCheck(blk[0]);
	}
	else if(blk[0].value === bit && blk[6].value === bit && blk[3].value === " ") {
		markAndCheck(blk[3]);
	}
	//Second vrline
	else if(blk[1].value === bit && blk[4].value === bit && blk[7].value === " ") {
		markAndCheck(blk[7]);
	}
	else if(blk[4].value === bit && blk[7].value === bit && blk[1].value === " ") {
		markAndCheck(blk[1]);
	}
	else if(blk[1].value === bit && blk[7].value === bit && blk[4].value === " ") {
		markAndCheck(blk[4]);
	}
	//Third vrline
	else if(blk[2].value === bit && blk[5].value === bit && blk[8].value === " ") {
		markAndCheck(blk[8]);
	}
	else if(blk[5].value === bit && blk[8].value === bit && blk[2].value === " ") {
		markAndCheck(blk[2]);
	}
	else if(blk[2].value === bit && blk[8].value === bit && blk[5].value === " ") {
		markAndCheck(blk[5]);
	}
	//==========================checking diagonally======================
	//First dlline
	else if(blk[0].value === bit && blk[4].value === bit && blk[8].value === " ") {
		markAndCheck(blk[8]);
	}
	else if(blk[4].value === bit && blk[8].value === bit && blk[0].value === " ") {
		markAndCheck(blk[0]);
	}
	else if(blk[0].value === bit && blk[8].value === bit && blk[4].value === " ") {
		markAndCheck(blk[4]);
	}
	//Second dlline
	else if(blk[6].value === bit && blk[4].value === bit && blk[2].value === " ") {
		markAndCheck(blk[2]);
	}
	else if(blk[4].value === bit && blk[2].value === bit && blk[6].value === " ") {
		markAndCheck(blk[6]);
	}
	else if(blk[6].value === bit && blk[2].value === bit && blk[4].value === " ") {
		markAndCheck(blk[4]);
	}
	else{
		return false;
	}
	return true;
}

function markAndCheck(boardblock) {
	setTimeout(function() {
		boardblock.value = "x";
		//checking ai winning condition
		if(winningCombination("x")) {
			AIScore += 1;
			AI.textContent = "AI(X) - "+ AIScore;
			gameOver = true;
			toggle.style.display = "block";
			updateMessage.textContent = "OOPS! you lost, try again.";
			updateMessage.style.color = "red";
			setTimeout(resetGame,1500);
		}
		//game draw status checking
		else if (vacantChecker() && !winningCombination("0") && !winningCombination("x") ) {
			gameOver = true;
			toggle.style.display = "block";
			updateMessage.textContent = "Well tried, It's draw.";
			setTimeout(resetGame,1500);
		}
        clickPreventer = 0;
	}, 500);
}

function resetGame() {
	defendChecker = "undefend";
	attackChecker = "unattack";
	firstTurn = 0;
	userMiddleTurn = 0;
	deadZoneTurn = 0;
	commonBlocker = 0;
    clickPreventer = 0;
    diagonalDeadZone1 = 0;
    diagonalDeadZone2 = 0;
	gameOver = false;
	toggle.style.display = "none";
	updateMessage.style.color = "green";
	array = [ ];
	for(let i = 0; i < blk.length; i++) {
		blk[i].value = " ";
		blk[i].style.color = "white";
	}
}
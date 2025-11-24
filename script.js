const resultDisplay = document.getElementById('result-display');
const choiceButtons = document.querySelectorAll('.choice-btn');
const userScoreDisplay=document.getElementById('user-score');
const computerScoreDisplay=document.getElementById('computer-score');
const roundInfoDisplay = document.getElementById('current-round');
const resetButton = document.getElementById('reset-btn');
const moves = ['rock', 'paper', 'scissors'];

let userScore=0;
let computerScore=0;
let currentRound = 1;
let userHistory = [];
const maxRounds = 5;

function getComputerChoice() {
    const randomIndex = Math.floor(Math.random() * moves.length);
    return moves[randomIndex];
}

function updateScoreDisplays(){
	userScoreDisplay.textContent=userScore;
	computerScoreDisplay.textContent=computerScore;
	roundInfoDisplay.textContent=currentRound;
}

function endGame(message){
	const historyString = userHistory.join(', ');
	resultDisplay.innerHTML = `<strong style="color: red;">Game Over!</strong><br>${message}<br><br>
	<strong>Your moves this game:</strong><br> ${historyString}`;
	choiceButtons.forEach(button =>{
		button.disabled=true;
	});
	resetButton.style.display='block';
}

function playGame(userChoice) {
	if (currentRound > maxRounds){
		return;
	}
	userHistory.push(userChoice);
    const computerChoice = getComputerChoice();
    let roundResult = '';

    if (userChoice === computerChoice) {
        roundResult = "It's a tie! 🤝";
    } 
    else if (
        (userChoice === 'rock' && computerChoice === 'scissors') ||
        (userChoice === 'paper' && computerChoice === 'rock') ||
        (userChoice === 'scissors' && computerChoice === 'paper')
    ) {
        roundResult = 'You win! 🎉';
		userScore++;
    } 
    else {
        roundResult = 'You lose! 😢';
		computerScore++;
    }
	
		updateScoreDisplays();
	
	resultDisplay.innerHTML = `
        You chose **${userChoice}**. <br>
        The computer chose **${computerChoice}**. <br>
        **${roundResult}**
    `;
	
   	if (userScore === 3 || computerScore === 3) { 
		const finalResult = userScore > computerScore ?
			"Congratulations! You won the best of five!" :
			"The computer won the best of five.";
		endGame(finalResult);
	}
    else if (currentRound === maxRounds) {
        let finalResult;
        if (userScore > computerScore) {
            finalResult = "You won the best of five!";
        } 
		else if (computerScore > userScore) {
            finalResult = "The computer won the best of five.";
        } 
		else {
            finalResult = "The best of five ended in a draw.";
        }
		endGame(finalResult);
	}
   	else {
		currentRound++;
		roundInfoDisplay.textContent=currentRound;
	}
}

function resetGame(){
	userScore = 0;
	computerScore = 0;
	currentRound = 1;
	userHistory = [];
	resultDisplay.innerHTML = 'Make your choice to start the game!';
	choiceButtons.forEach(button =>{
		button.disabled = false;
	});
	resetButton.style.display = 'none';
	updateScoreDisplays();
}

choiceButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        const userChoice = e.currentTarget.id;
        playGame(userChoice);
    });
});

resetButton.addEventListener('click', resetGame);

updateScoreDisplays();
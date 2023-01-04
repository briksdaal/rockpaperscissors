const ROCK = 0;
const PAPER = 1;
const SCISSORS = 2;
const WIN = 3;
const LOSE = 4;
const TIE = 5;

function getComputerChoice() {
  let choiceNum = Math.floor(Math.random() * 3);
  switch (choiceNum) {
    case 0:
      return "Rock";
      break;
    case 1:
      return "Paper";
      break;
    case 2:
      return "Scissors";
      break;
  }
}

function capitalize(str) {
  return str.slice(0, 1).toUpperCase().concat(str.slice(1));
}

function lowercaseAndCapitalize(str) {
  if (str === null || str === undefined) {
    return;
  }
  return capitalize(str.toLowerCase());
}

function playRound(playerSelection) {
  playerSelection = lowercaseAndCapitalize(playerSelection);
  computerSelection = getComputerChoice();

  const yourChoice = document.querySelector(".your-choice");
  const compChoice = document.querySelector(".comp-choice");
  const roundResults = document.querySelector(".round-results p");
  yourChoice.textContent = playerSelection;
  compChoice.textContent = computerSelection;

  const resultString = getResult(playerSelection, computerSelection);
  roundResults.textContent = resultString;
  const result = assessResult(resultString);
  if (result === WIN) {
    winsCounter.textContent = parseInt(winsCounter.textContent) + 1;
  } else if (result === LOSE) {
    lossesCounter.textContent = parseInt(lossesCounter.textContent) + 1;
  } else if (result === TIE) {
    tiesCounter.textContent = parseInt(tiesCounter.textContent) + 1;
  }
}

function getResult(playerSelection, computerSelection) {
  let declaration = "";
  if (
    !(
      playerSelection === "Rock" ||
      playerSelection === "Paper" ||
      playerSelection === "Scissors"
    )
  ) {
    declaration =
      "Bad input! Pleae enter either 'Rock', 'Paper', or 'Scissors'. Input is not case sensitive.";
    return declaration;
  }

  if (playerSelection === computerSelection) {
    declaration = `It's a Tie! You both chose ${playerSelection}`;
  } else if (
    (playerSelection === "Rock" && computerSelection === "Scissors") ||
    (playerSelection === "Scissors" && computerSelection === "Paper") ||
    (playerSelection === "Paper" && computerSelection === "Rock")
  ) {
    declaration = `You Win! ${playerSelection} beats ${computerSelection}`;
  } else {
    declaration = `You Lose! ${computerSelection} beats ${playerSelection}`;
  }

  return declaration;
}

function assessResult(result) {
  let splitResult = result.split("!");
  if (splitResult[0] === "You Win") {
    return WIN;
  } else if (splitResult[0] === "You Lose") {
    return LOSE;
  } else if (splitResult[0] === "It's a Tie") {
    return TIE;
  } else {
    return 3;
  }
}

function initiateGame() {
  const rock = document.querySelector(".rock-button");
  const paper = document.querySelector(".paper-button");
  const scissors = document.querySelector(".scissors-button");

  winsCounter.textContent = 0;
  lossesCounter.textContent = 0;
  tiesCounter.textContent = 0;

  let maxWins = 3;

  let playerSelection = 5;
  const playerChoices = document.querySelectorAll(
    ".button-container div button"
  );
  playerChoices.forEach((button) =>
    button.addEventListener("click", () => playRound(button.textContent))
  );

  return;
  computerSelection = getComputerChoice();
  let result = playRound(playerSelection, computerSelection);
  let enumeratedResult = assessResult(result);
  if (enumeratedResult === 0) {
    wins++;
  } else if (enumeratedResult === 1) {
    losses++;
  } else if (enumeratedResult === 2) {
    ties++;
  }

  console.log(result);
  console.log(`Wins: ${wins}, Losses: ${losses}, Ties: ${ties}`);

  if (wins > losses) {
    console.log("You Win the 5 round game! Congratulations");
  } else if (wins < losses) {
    console.log("You Lose the 5 round game! Maybe next time");
  } else {
    console.log("You finish the 5 round game with a tie...");
  }
}

const winsCounter = document.querySelector(".win-score");
const lossesCounter = document.querySelector(".lose-score");
const tiesCounter = document.querySelector(".tie-score");
const playAgain = document.querySelector(".play-again button");

playAgain.addEventListener("click", () => initiateGame());

initiateGame();

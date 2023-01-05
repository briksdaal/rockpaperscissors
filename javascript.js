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
  setImg(yourChoice.previousElementSibling, playerSelection);
  setImg(compChoice.previousElementSibling, computerSelection);

  const resultString = getResult(playerSelection, computerSelection);
  roundResults.textContent = resultString;
  const result = assessResult(resultString);
  if (result === WIN) {
    wins++;
  } else if (result === LOSE) {
    losses++;
  } else if (result === TIE) {
    ties++;
  }

  updateScores();

  // if (winsCounter.textContent === 5 || lossesCounter.textContent === 5) {
  //   const playerChoices = document.querySelectorAll(
  //     ".button-container div button"
  //   );
  //   playerChoices.forEach((button) =>
  //     button.removeEventListener("click", () => playRound(button.textContent))
  //   );
  // }
}

function setImg(imgDiv, selection) {
  const classes = ["rock-img", "paper-img", "scissors-img", "question-img"];
  imgDiv.classList.remove(...classes);
  if (selection === "Rock") {
    imgDiv.classList.add("rock-img");
  } else if (selection === "Paper") {
    imgDiv.classList.add("paper-img");
  } else if (selection === "Scissors") {
    imgDiv.classList.add("scissors-img");
  } else {
    imgDiv.classList.add("question-img");
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
function updateScores() {
  const winsCounter = document.querySelector(".win-score");
  const lossesCounter = document.querySelector(".lose-score");
  const tiesCounter = document.querySelector(".tie-score");

  winsCounter.textContent = wins;
  lossesCounter.textContent = losses;
  tiesCounter.textContent = ties;
}

function resetGame() {
  const playerImgDiv = document.querySelector(
    ".your-choice-container .choice-img"
  );
  const compImgDiv = document.querySelector(
    ".comp-choice-container .choice-img"
  );
  const roundResults = document.querySelector(".round-results p");

  wins = 0;
  losses = 0;
  ties = 0;

  updateScores();

  setImg(playerImgDiv, "question-img");
  setImg(compImgDiv, "question-img");

  roundResults.textContent = "Rock, paper, or scissors... choose wisely";
}

function initiateGame() {
  const rock = document.querySelector(".rock-button");
  const paper = document.querySelector(".paper-button");
  const scissors = document.querySelector(".scissors-button");

  resetGame();

  let maxWins = 3;

  const playerChoices = document.querySelectorAll(
    ".button-container div button"
  );
  playerChoices.forEach((button) =>
    button.addEventListener("click", () => playRound(button.textContent))
  );

  return;

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

function testGameOver(e) {
  console.log("what");
  console.log(e);
}

let wins, losses, ties;

const playAgain = document.querySelector(".play-again button");

playAgain.addEventListener("click", () => resetGame());

initiateGame();

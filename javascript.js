const WIN = 0;
const LOSE = 1;
const TIE = 2;
const OTHER = 3;

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

  if (
    playerSelection !== "Rock" &&
    playerSelection !== "Paper" &&
    playerSelection !== "Scissors"
  )
    playerSelection = "???";

  const yourChoice = document.querySelector(".your-choice");
  const compChoice = document.querySelector(".comp-choice");
  const roundResults = document.querySelector(".results p");
  yourChoice.textContent = playerSelection;
  compChoice.textContent = computerSelection;
  setImg(yourChoice.previousElementSibling, playerSelection);
  setImg(compChoice.previousElementSibling, computerSelection);

  const result = assessResult(playerSelection, computerSelection);
  const resultString = generateResultString(
    result,
    playerSelection,
    computerSelection
  );

  roundResults.textContent = resultString;

  if (result === WIN) {
    wins++;
  } else if (result === LOSE) {
    losses++;
  } else if (result === TIE) {
    ties++;
  }

  updateScores();
}

function setImg(imgDiv, selection) {
  const classes = ["rock-img", "paper-img", "scissors-img", "question-img"];
  imgDiv.classList.remove(...classes);
  if (selection === "???") selection = "question";
  selection = selection.toLowerCase().concat("-img");
  imgDiv.classList.add(selection);
}

function assessResult(playerSelection, computerSelection) {
  if (
    !(
      playerSelection === "Rock" ||
      playerSelection === "Paper" ||
      playerSelection === "Scissors"
    )
  ) {
    return OTHER;
  }

  if (playerSelection === computerSelection) {
    return TIE;
  } else if (
    (playerSelection === "Rock" && computerSelection === "Scissors") ||
    (playerSelection === "Scissors" && computerSelection === "Paper") ||
    (playerSelection === "Paper" && computerSelection === "Rock")
  ) {
    return WIN;
  } else {
    return LOSE;
  }
}

function generateResultString(result, playerSelection, computerSelection) {
  let resultString = "";
  if (result === WIN) {
    resultString = `You Win! ${playerSelection} beats ${computerSelection}`;
  } else if (result === LOSE) {
    resultString = `You Lose! ${computerSelection} beats ${playerSelection}`;
  } else if (result === TIE) {
    resultString = `It's a Tie! You both chose ${playerSelection}`;
  } else {
    resultString =
      "Bad input! Please enter either 'Rock', 'Paper', or 'Scissors'. Input is not case sensitive.";
  }

  return resultString;
}

function updateScores() {
  const winsCounter = document.querySelector(".win-score");
  const lossesCounter = document.querySelector(".lose-score");
  const tiesCounter = document.querySelector(".tie-score");

  winsCounter.textContent = wins;
  lossesCounter.textContent = losses;
  tiesCounter.textContent = ties;

  if (wins === maxWins || losses === maxWins) {
    gameOver();
  }
}

function resetText() {
  const roundResults2 = document.querySelector(".results p");
  roundResults2.textContent = "Rock, paper, or scissors...";
}

function resetImages() {
  const playerImgDiv = document.querySelector(
    ".your-choice-container .choice-img"
  );
  const compImgDiv = document.querySelector(
    ".comp-choice-container .choice-img"
  );
  setImg(playerImgDiv, "question");
  setImg(compImgDiv, "question");
}

function addButtonEvents() {
  const playerChoices = document.querySelectorAll(
    ".button-container"
  );

  playerChoices.forEach((button) => {
    button.addEventListener("click", startRound);
  });
}

const startRound = function (e) {
  playRound(this.lastElementChild.textContent);
};

function clearButtonEvents() {
  const playerChoices = document.querySelectorAll(
    ".button-container"
  );

  playerChoices.forEach((button) => {
    button.removeEventListener("click", startRound);
  });
}

function gameOver() {
  const finalMessage = document.querySelector(".results p");
  let message = "";
  if (wins === 5)
    message = `Success! You've defeated the computer, ${wins} - ${losses}`;
  else if (losses === 5)
    message = `Game Over! The computer beat you ${wins} - ${losses}`;
  finalMessage.textContent = message;

  clearButtonEvents();
}

function initiateGame() {
  wins = 0;
  losses = 0;
  ties = 0;
  updateScores();
  resetText();
  resetImages();
  clearButtonEvents();

  addButtonEvents();
}

let wins, losses, ties;
const maxWins = 5;

const playAgain = document.querySelector(".play-again button");
playAgain.addEventListener("click", () => initiateGame());

initiateGame();

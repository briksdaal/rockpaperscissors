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
  return capitalize(str.toLowerCase());
}

function playRound(playerSelection, computerSelection) {
  playerSelection = lowercaseAndCapitalize(playerSelection);
  if (
    !(
      playerSelection === "Rock" ||
      playerSelection === "Paper" ||
      playerSelection === "Scissors"
    )
  ) {
    console.log(
      "Bad input. Pleae enter either 'Rock', 'Paper', or 'Scissors'. Input is not case sensitive."
    );
    return;
  }
  let declaration = "";

  if (playerSelection === computerSelection) {
    declaration = `It's a Tie! You both chose ${playerSelection}`;
  } else if (
    (playerSelection === "Rock" && computerSelection === "Scissors") ||
    (playerSelection === "Scissors" && computerSelection === "Paper") ||
    (playerSelection === "Paper" && computerSelection === "Rock")
  ) {
    declaration = `You Win! ${playerSelection} beats ${computerSelection}`;
  }
  else {
    declaration = `You Lose! ${computerSelection} beats ${playerSelection}`;
  }

  return declaration;
}

const playerSelection = prompt("choose");
const computerSelection = getComputerChoice();

console.log(playRound(playerSelection, computerSelection));

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

function playRound(playerSelection, computerSelection) {
  playerSelection = lowercaseAndCapitalize(playerSelection);
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
    return 0;
  } else if (splitResult[0] === "You Lose") {
    return 1;
  } else if (splitResult[0] === "It's a Tie") {
    return 2;
  } else {
    return 3;
  }
}

function game() {
  let wins = 0,
    losses = 0,
    ties = 0;

  for (let i = 0; i < 5; i++) {
    playerSelection = prompt("Choose from rock, paper, or scissors!");
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
  }

  if (wins > losses) {
    console.log("You Win the 5 round game! Congratulations");
  } else if (wins < losses) {
    console.log("You Lose the 5 round game! Maybe next time");
  } else {
    console.log("You finish the 5 round game with a tie...");
  }
}

// game();

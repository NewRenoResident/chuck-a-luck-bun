export function chuckALuck() {
  console.log("CHUCK-A-LUCK".padStart(33, " "));
  console.log("CREATIVE COMPUTING".padStart(37, " "));
  console.log("MORRISTOWN, NEW JERSEY".padStart(38, " "));
  console.log("\n\n");

  console.log("CHOOSE A NUMBER FROM 1 TO 6. I WILL ROLL 3 DICE.");
  console.log("IF YOUR NUMBER MATCHES 1 DIE, I PAY OFF EVEN MONEY.");
  console.log("TWO DICE, 2:1    3 DICE, 3:1");
  console.log("\n");

  let money = 500;

  let gameRunning = true;

  function playRound() {
    if (!gameRunning) return;

    console.log(`YOU HAVE $${money}. MAKE A BET.`);

    const betPrompt = () => {
      const bet = prompt("Enter your bet:");
      if (bet === null) {
        return null;
      }
      return bet ? parseInt(bet) : 0;
    };

    let bet = betPrompt();

    if (bet === null) {
      console.log("Game ended. Thanks for playing!");
      gameRunning = false;
      return;
    }
    if (bet > money) {
      console.log("I DON'T TAKE I.O.U's !!!!");
      playRound();
      return;
    }

    if (bet <= 0 || Math.floor(bet * 100) !== bet * 100) {
      console.log("DON'T GET CUTE!!!");
      playRound();
      return;
    }

    const numberPrompt = () => {
      const num = prompt("CHOOSE A NUMBER");
      return num ? parseInt(num) : 0;
    };

    let chosenNumber;
    while (true) {
      chosenNumber = numberPrompt();
      if (
        Number.isInteger(chosenNumber) &&
        chosenNumber > 0 &&
        chosenNumber < 7
      ) {
        break;
      }
      console.log("CHEATER!!!!!");
    }

    const dice = [
      Math.floor(Math.random() * 6) + 1,
      Math.floor(Math.random() * 6) + 1,
      Math.floor(Math.random() * 6) + 1,
    ];

    console.log(dice.join("    "));

    const matches = dice.filter((d) => d === chosenNumber).length;

    console.log(`YOU'VE MATCHED ${matches} TIMES.`);

    if (matches === 0) {
      console.log(`YOU LOSE $${bet}`);
      money -= bet;
    } else {
      const winnings = bet * matches;
      console.log(`YOU'VE WON $${winnings}`);
      money += winnings;
    }

    if (money <= 0) {
      console.log("\nGAME OVER!");
      return;
    }

    setTimeout(playRound, 1000);
  }

  playRound();
}

setTimeout(() => {
  chuckALuck();
}, 3000);

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
    if (!gameRunning) return false;

    console.log(`YOU HAVE $${money}. MAKE A BET.`);

    const bet = prompt("Enter your bet:");
    if (bet === null || bet === "") {
      console.log("Game ended. Thanks for playing!");
      gameRunning = false;
      return false;
    }

    const betAmount = bet ? parseInt(bet) : 0;

    if (betAmount > money) {
      console.log("I DON'T TAKE I.O.U's !!!!");
      return true;
    }

    if (betAmount <= 0 || Math.floor(betAmount * 100) !== betAmount * 100) {
      console.log("DON'T GET CUTE!!!");
      return true;
    }

    const num = prompt("CHOOSE A NUMBER");
    const chosenNumber = num ? parseInt(num) : 0;

    if (
      !Number.isInteger(chosenNumber) ||
      chosenNumber <= 0 ||
      chosenNumber > 6
    ) {
      console.log("CHEATER!!!!!");
      return true;
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
      console.log(`YOU LOSE $${betAmount}`);
      money -= betAmount;
    } else {
      const winnings = betAmount * matches;
      console.log(`YOU'VE WON $${winnings}`);
      money += winnings;
    }

    if (money <= 0) {
      console.log("\nGAME OVER!");
      gameRunning = false;
      return false;
    }

    return true;
  }

  while (gameRunning) {
    const shouldContinue = playRound();
    if (!shouldContinue) break;
  }
}

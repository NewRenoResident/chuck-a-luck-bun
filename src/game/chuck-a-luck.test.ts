import { expect, test, describe, beforeEach } from "bun:test";
import { chuckALuck } from "./chuck-a-luck";

describe("Chuck-A-Luck Game", () => {
  let consoleLogs: string[] = [];
  let promptResponses: string[] = [];
  let promptIndex = 0;

  beforeEach(() => {
    consoleLogs = [];
    promptIndex = 0;

    // Mock console.log
    global.console.log = (message: any) => {
      consoleLogs.push(String(message));
    };

    // Mock prompt
    global.prompt = () => {
      const response = promptResponses[promptIndex];
      promptIndex++;
      return response;
    };
  });

  test("should display correct initial messages", () => {
    promptResponses = [null]; // End game immediately
    chuckALuck();

    expect(consoleLogs[0]).toContain("CHUCK-A-LUCK");
    expect(consoleLogs[1]).toContain("CREATIVE COMPUTING");
    expect(consoleLogs[2]).toContain("MORRISTOWN, NEW JERSEY");
  });

  test("should handle invalid bet input", () => {
    promptResponses = ["abc", null]; // Invalid bet, then end game
    chuckALuck();

    expect(consoleLogs).toContain("DON'T GET CUTE!!!");
  });

  test("should handle bet larger than current money", () => {
    promptResponses = ["1000", null]; // Too large bet, then end game
    chuckALuck();

    expect(consoleLogs).toContain("I DON'T TAKE I.O.U's !!!!");
  });

  test("should handle invalid number choice", () => {
    promptResponses = ["100", "7", null]; // Valid bet, invalid number, end game
    chuckALuck();

    expect(consoleLogs).toContain("CHEATER!!!!!");
  });

  test("should correctly calculate winnings", () => {
    const originalRandom = Math.random;
    Math.random = () => 0.5; // Will always roll 4

    promptResponses = ["100", "4", null]; // Bet 100, choose 4 (matching all dice), end game
    chuckALuck();

    expect(consoleLogs).toContain("YOU'VE WON $300");

    Math.random = originalRandom;
  });

  test("should correctly handle losing scenario", () => {
    const originalRandom = Math.random;
    Math.random = () => 0; // Will always roll 1

    promptResponses = ["100", "6", null]; // Bet 100, choose 6 (no matches), end game
    chuckALuck();

    expect(consoleLogs).toContain("YOU LOSE $100");

    Math.random = originalRandom;
  });

  test("should end game when money runs out", () => {
    const originalRandom = Math.random;
    Math.random = () => 0; // Will always roll 1

    promptResponses = ["500", "6"]; // Bet all money, choose 6 (no matches)
    chuckALuck();

    expect(consoleLogs.join(" ")).toContain("GAME OVER!");

    Math.random = originalRandom;
  });

  test("should handle game termination", () => {
    promptResponses = [null]; // Simulate cancel/exit
    chuckALuck();

    expect(consoleLogs).toContain("Game ended. Thanks for playing!");
  });
});

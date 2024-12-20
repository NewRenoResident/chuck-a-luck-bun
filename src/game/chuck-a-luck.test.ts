import { expect, test, describe, beforeEach } from "bun:test";
import { chuckALuck } from "./chuck-a-luck";

describe("Chuck-A-Luck Game", () => {
  let consoleLogs: string[] = [];
  let promptResponses: string[] = [];
  let promptIndex = 0;

  beforeEach(() => {
    consoleLogs = [];
    promptIndex = 0;

    global.console.log = (message: any) => {
      consoleLogs.push(String(message));
    };

    global.prompt = () => {
      const response = promptResponses[promptIndex];
      promptIndex++;
      return response;
    };
  });

  test("should display correct initial messages", () => {
    promptResponses = [null];
    chuckALuck();

    expect(consoleLogs[0]).toContain("CHUCK-A-LUCK");
    expect(consoleLogs[1]).toContain("CREATIVE COMPUTING");
    expect(consoleLogs[2]).toContain("MORRISTOWN, NEW JERSEY");
  });

  test("should handle invalid bet input", () => {
    promptResponses = ["abc", null];
    chuckALuck();

    expect(consoleLogs).toContain("DON'T GET CUTE!!!");
  });

  test("should handle bet larger than current money", () => {
    promptResponses = ["1000", null];
    chuckALuck();

    expect(consoleLogs).toContain("I DON'T TAKE I.O.U's !!!!");
  });

  test("should handle invalid number choice", () => {
    promptResponses = ["100", "7", null];
    chuckALuck();

    expect(consoleLogs).toContain("CHEATER!!!!!");
  });

  test("should correctly calculate winnings", () => {
    const originalRandom = Math.random;
    Math.random = () => 0.5;

    promptResponses = ["100", "4", null];
    chuckALuck();

    expect(consoleLogs).toContain("YOU'VE WON $300");

    Math.random = originalRandom;
  });

  test("should correctly handle losing scenario", () => {
    const originalRandom = Math.random;
    Math.random = () => 0;

    promptResponses = ["100", "6", null];
    chuckALuck();

    expect(consoleLogs).toContain("YOU LOSE $100");

    Math.random = originalRandom;
  });

  test("should end game when money runs out", () => {
    const originalRandom = Math.random;
    Math.random = () => 0;

    promptResponses = ["500", "6"];
    chuckALuck();

    expect(consoleLogs.join(" ")).toContain("GAME OVER!");

    Math.random = originalRandom;
  });

  test("should handle game termination", () => {
    promptResponses = [null];
    chuckALuck();

    expect(consoleLogs).toContain("Game ended. Thanks for playing!");
  });
});

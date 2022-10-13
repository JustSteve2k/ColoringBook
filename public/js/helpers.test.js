import { describe } from "yargs";
import { GetRandomInt, Sum, TempMessage, TranslateColor } from "./helpers";
// const helper = require("./helpers.js");

// describe("adds numbers", () => {});
test("1 + 2", () => {
  expect(Sum(1, 2)).toBe(3);
});

test("4 + 2", () => {
  expect(Sum(4, 2)).toBe(6);
});

test("translate color", () => {
  expect(TranslateColor("box1")).toBe("color1");
});

test("get a random number", () => {
  expect(GetRandomInt(50)).toBeLessThan(50);
});

test("get random int with max of 1", () => {
  expect(GetRandomInt(1)).toBeLessThan(1);
});

test("get random int with max of 1, no argument supplied", () => {
  expect(GetRandomInt()).toBeLessThan(1);
});

// test.skip("test message", () => {
//   expect(TempMessage("message").toBe(undefined));
// });

test.todo("something that checks other stuff.");

import { GetRandomInt, Sum } from "./helpers";

test("1 + 2", () => {
  expect(Sum(1, 2)).toBe(3);
});

test("4 + 2", () => {
  expect(Sum(4, 2)).toBe(6);
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

test.todo("something that checks other stuff.");

import { AdjustPointsOnPointsArray, AdjustPointsOnPointsStinrg, GeneratePointsArray, GeneratePointsStringFromArray } from "./shapes.js";

test("generates string 1", () => {
  expect(GeneratePointsStringFromArray([50, 0, 100], [0, 100, 100])).toBe("50,0 0,100 100,100");
});

test("generates string 2", () => {
  expect(GeneratePointsStringFromArray([50, 0, 100, 20], [0, 100, 100, 50])).toBe("50,0 0,100 100,100 20,50");
});

test("generates string 3 - short string", () => {
  expect(GeneratePointsStringFromArray([50], [0])).toBe("50,0");
});

test("generates points array of 3 ints", () => {
  expect(GeneratePointsArray(3, 50)).toHaveLength(3);
});

test("generates points array of 5 ints", () => {
  expect(GeneratePointsArray(5, 50)).toHaveLength(5);
});

test("adjusts a 3 point array by 20", () => {
  expect(AdjustPointsOnPointsArray([20, 40, 60], 20)).toStrictEqual([40, 60, 80]);
});

test("adjusts a 4 point array by 10", () => {
  expect(AdjustPointsOnPointsArray([10, 20, 30, 40], 10)).toStrictEqual([20, 30, 40, 50]);
});

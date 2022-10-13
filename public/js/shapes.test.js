import { AddTriangle, GeneratePointsString } from "./shapes.js";

let pointsX = [50, 0, 100];
let pointsY = [0, 100, 100];

test("generates string 1", () => {
  expect(GeneratePointsString([50, 0, 100], [0, 100, 100])).toBe("50,0 0,100 100,100");
});

test("generates string 2", () => {
  expect(GeneratePointsString([50, 0, 100, 20], [0, 100, 100, 50])).toBe("50,0 0,100 100,100 20,50");
});

test("generates string 3 - short string", () => {
  expect(GeneratePointsString([50], [0])).toBe("50,0");
});

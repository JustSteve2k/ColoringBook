import { GetRandomInt } from "./helpers.js";

export function AddDynamicPolygon(points) {
  let MaxX = 650;
  let MaxY = 650;

  let pointsX = GeneratePointsArray(points, MaxX);
  let pointsY = GeneratePointsArray(points, MaxY);

  console.log(pointsX);
  console.log(pointsY);

  let pointsString = GeneratePointsStringFromArray(pointsX, pointsY);

  CreatePolygon(pointsString);
}

export function AddSquare() {
  // alert("add new polygon");

  let MaxX = 540;
  let MaxY = 500;

  let pointsX = [25, 100, 100, 25];
  let pointsY = [25, 25, 100, 100];

  let adjustX = GetRandomInt(MaxX);
  let adjustY = GetRandomInt(MaxY);

  let pointsString = "";

  for (let x = 0; x < 4; x++) {
    pointsString += (pointsX[x] + adjustX).toString();
    pointsString += ",";
    pointsString += (pointsY[x] + adjustY).toString();
    pointsString += " ";
  }

  CreatePolygon(pointsString);
}

export function AddTriangle() {
  let MaxX = 540;
  let MaxY = 500;

  let pointsX = [50, 0, 100];
  let pointsY = [0, 100, 100];

  let adjustX = GetRandomInt(MaxX);
  let adjustY = GetRandomInt(MaxY);

  let pointsString = GeneratePointsStringFromArray(pointsX, pointsY);

  CreatePolygon(pointsString);
}

// Finishes creating a polygon and appends to the dom.  Need to know modesomehow.
function CreatePolygon(pointsString) {
  console.log(`The generated string is - ${pointsString}`);

  let polygon = document.createElementNS("http://www.w3.org/2000/svg", "polygon");

  polygon.setAttribute("class", "zone color0");
  polygon.setAttribute("points", pointsString);
  polygon.setAttribute("fill", "currentcolor");

  // Fix this part to add correct listener via function.

  // polygon.addEventListener("click", (e) => {
  //   PaintItem(e);
  // });

  let drawing = document.getElementById("drawing");

  drawing.append(polygon);
}

export function GeneratePointsArray(length, max, adjust = 1) {
  let points = [];

  for (let x = 0; x < length; x++) {
    points[x] = GetRandomInt(max) * adjust;
  }
  return points;
}

export function GeneratePointsStringFromArray(pointsX, pointsY) {
  let pointsString = "";

  for (let x = 0; x < pointsX.length; x++) {
    pointsString += pointsX[x].toString();
    pointsString += ",";
    pointsString += pointsY[x].toString();
    if (x != pointsX.length - 1) pointsString += " ";
  }

  return pointsString;
}

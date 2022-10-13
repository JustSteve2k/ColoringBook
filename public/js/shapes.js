import { GetRandomInt } from "./helpers.js";

export function AddDynamicPolygon(points) {
  let pointsX = [];
  let pointsY = [];

  let MaxX = 650;
  let MaxY = 650;

  for (let x = 0; x < points; x++) {
    pointsX[x] = Math.floor(Math.random() * MaxX);
  }

  for (let x = 0; x < points; x++) {
    pointsY[x] = Math.floor(Math.random() * MaxY);
  }

  console.log(pointsX);
  console.log(pointsY);

  let pointsString = "";

  for (let x = 0; x < points; x++) {
    pointsString += pointsX[x].toString();
    pointsString += ",";
    pointsString += pointsY[x].toString();
    pointsString += " ";
  }

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

  let adjustX = Math.floor(Math.random() * MaxX);
  let adjustY = Math.floor(Math.random() * MaxY);

  let pointsString = "";

  for (let x = 0; x < 3; x++) {
    pointsString += (pointsX[x] + adjustX).toString();
    pointsString += ",";
    pointsString += (pointsY[x] + adjustY).toString();
    pointsString += " ";
  }
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

export function GeneratePointsString(pointsX, pointsY) {
  let pointsString = "";

  for (let x = 0; x < pointsX.length; x++) {
    pointsString += pointsX[x].toString();
    pointsString += ",";
    pointsString += pointsY[x].toString();
    if (x != pointsX.length - 1) pointsString += " ";
  }

  return pointsString;
}

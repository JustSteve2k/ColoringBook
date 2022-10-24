import { cursorCaller, cursorRemover, deleteCaller, paintCaller } from "./actions.js";
import { GenerateUniqueID, GetCurrentMode, GetRandomInt, GetSelectedBox, TranslateColor } from "./helpers.js";

export function AddDynamicPolygon(points) {
  let MaxX = 650;
  let MaxY = 650;

  let pointsX = GeneratePointsArray(points, MaxX);
  let pointsY = GeneratePointsArray(points, MaxY);

  // console.log(pointsX);
  // console.log(pointsY);

  let pointsString = GeneratePointsStringFromArray(pointsX, pointsY);

  CreatePolygon(pointsString);
}

export function AddSquare() {
  let MaxX = 540;
  let MaxY = 500;

  let pointsX = [25, 100, 100, 25];
  let pointsY = [25, 25, 100, 100];

  let adjustX = GetRandomInt(MaxX);
  let adjustY = GetRandomInt(MaxY);

  pointsX = AdjustPointsOnPointsArray(pointsX, adjustX);
  pointsY = AdjustPointsOnPointsArray(pointsY, adjustY);

  let pointsString = GeneratePointsStringFromArray(pointsX, pointsY);

  CreatePolygon(pointsString);
}

export function AddTriangle() {
  let MaxX = 540;
  let MaxY = 500;

  let pointsX = [50, 0, 100];
  let pointsY = [0, 100, 100];

  let adjustX = GetRandomInt(MaxX);
  let adjustY = GetRandomInt(MaxY);

  pointsX = AdjustPointsOnPointsArray(pointsX, adjustX);
  pointsY = AdjustPointsOnPointsArray(pointsY, adjustY);

  let pointsString = GeneratePointsStringFromArray(pointsX, pointsY);

  CreatePolygon(pointsString);
}

// Finishes creating a polygon and appends to the dom.  Need to know modesomehow.
// id = "", classes = "", pointsString, fill = "", locked = "", selectable = ""
export function CreatePolygon(pointsString = "", id = "", classes = "", fill = "", locked = "", selectable = "") {
  // console.log(`The points string for this polygon is - ${pointsString}`);

  let polygon = document.createElementNS("http://www.w3.org/2000/svg", "polygon");

  let UID = "";
  if (id === "") {
    UID = GenerateUniqueID(24);
  } else {
    UID = id;
  }
  polygon.setAttribute("id", UID);

  if (classes === "") {
    const color = TranslateColor(GetSelectedBox());
    polygon.setAttribute("class", "zone " + color);
  } else {
    polygon.setAttribute("class", classes);
  }

  polygon.setAttribute("points", pointsString);

  if (fill === "") {
    polygon.setAttribute("fill", "currentcolor");
  } else {
    polygon.setAttribute("fill", fill);
  }

  if (locked === "") {
    polygon.setAttribute("locked", "false");
  } else {
    polygon.setAttribute("locked", locked);
  }

  if (selectable === "") {
    polygon.setAttribute("selectable", "true");
  } else {
    polygon.setAttribute("selectable", selectable);
  }

  let drawing = document.getElementById("drawing");
  drawing.append(polygon);

  AttachListener(UID);
}

// Determines which mode it is and attached said listener. - TBD
function AttachListener(UID) {
  let mode = GetCurrentMode();

  let piece = document.getElementById(UID);

  if (mode === "paint") {
    console.log(`Paint mode added to id of ${UID}`);
    piece.addEventListener("click", paintCaller);
  }

  if (mode === "cursor") {
    console.log(`Cursor mode added to id of ${UID}`);
    piece.addEventListener("focus", cursorCaller);
    piece.addEventListener("blur", cursorRemover);
  }

  if (mode === "delete") {
    console.log(`Delete mode added to id of ${UID}`);
    piece.addEventListener("click", deleteCaller);
  }
}

export function GeneratePointsArray(length, max, adjust = 1) {
  let points = [];

  for (let x = 0; x < length; x++) {
    points[x] = GetRandomInt(max) * adjust;
  }
  return points;
}

// Generates a string to create the polygon from two arrays of numbers.
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

// Adjusts each point on a points array by a set amount, default is 0.
export function AdjustPointsOnPointsArray(pointsString, adjustment = 0) {
  for (let x = 0; x < pointsString.length; x++) {
    pointsString[x] += adjustment;
  }

  return pointsString;
}

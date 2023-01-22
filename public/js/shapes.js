import { cursorCaller, cursorRemover, deleteCaller, paintCaller } from "./actions.js";
import { GenerateUniqueID, GetCurrentMode, GetCurrentSelectedColor, GetRandomInt } from "./helpers.js";
import { SVG } from "@svgdotjs/svg.js";
import "@svgdotjs/svg.draggable.js";

// Construct a polygon from points string only.
export function AddDynamicPolygon(points) {
  let MaxX = 900;
  let MaxY = 600;

  let pointsX = GeneratePointsArray(points, MaxX);
  let pointsY = GeneratePointsArray(points, MaxY);

  let pointsString = GeneratePointsStringFromArray(pointsX, pointsY);

  CreatePolygon(pointsString);
}

// Max and MaxY adre hardcoded currently.  Need to reach from global?
export function AddSquare() {
  let MaxX = 900 - 75;
  let MaxY = 600 - 75;

  let pointsX = [0, 75, 75, 0];
  let pointsY = [0, 0, 75, 75];

  let adjustX = GetRandomInt(MaxX);
  let adjustY = GetRandomInt(MaxY);

  pointsX = AdjustPointsOnPointsArray(pointsX, adjustX);
  pointsY = AdjustPointsOnPointsArray(pointsY, adjustY);

  let pointsString = GeneratePointsStringFromArray(pointsX, pointsY);

  CreatePolygon(pointsString);
}

// Adds a generic triangle to the drawing board.
export function AddTriangle() {
  // Currently subtracts for the size of the triangle.  Needs to be adjusted dynamically;
  let MaxX = 900 - 100;
  let MaxY = 600 - 100;

  let pointsX = [50, 0, 100];
  let pointsY = [0, 100, 100];

  let adjustX = GetRandomInt(MaxX);
  let adjustY = GetRandomInt(MaxY);

  pointsX = AdjustPointsOnPointsArray(pointsX, adjustX);
  pointsY = AdjustPointsOnPointsArray(pointsY, adjustY);

  let pointsString = GeneratePointsStringFromArray(pointsX, pointsY);

  CreatePolygon(pointsString);
}

// Adds a generic circle to the drawing board.
// DEV NOTE - Some overlapping occuring when circle overlaps outside of the box.
export function AddCircle() {
  let MaxX = 840;
  let MaxY = 500;

  let adjustX = GetRandomInt(MaxX);
  let adjustY = GetRandomInt(MaxY);

  let cx = 50 + adjustX;
  let cy = 50 + adjustY;
  let r = GetRandomInt(50);

  let circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");

  const UID = GenerateUniqueID(24, "CIRC");
  let fill = GetCurrentSelectedColor();

  circle.setAttribute("cx", cx);
  circle.setAttribute("cy", cy);
  circle.setAttribute("r", r);
  circle.setAttribute("id", UID);
  circle.setAttribute("class", "zone ");
  circle.setAttribute("fill", fill);
  circle.setAttribute("locked", "false");
  circle.setAttribute("selectable", "true");

  let drawing = document.getElementById("drawing");
  drawing.append(circle);

  AttachListener(UID);
}

// Creates a circle from provided object
export function AddCircleFromParams(item) {
  let MaxX = 540;
  let MaxY = 500;

  let adjustX = GetRandomInt(MaxX);
  let adjustY = GetRandomInt(MaxY);

  let cx = 0;
  item.cx === undefined ? (cx = 50 + adjustX) : (cx = item.cx);

  let cy = 0;
  item.cy === undefined ? (cy = 50 + adjustY) : (cy = item.cy);

  let r = 0;
  item.r === undefined ? (r = GetRandomInt(50)) : (r = item.r);

  let fill = "";
  item.fill === undefined ? (fill = GetCurrentSelectedColor()) : (fill = item.fill);

  let locked = "";
  item.locked === undefined ? (locked = "false") : (locked = item.locked);

  let selectable = "";
  item.selectable === undefined ? (selectable = "true") : (selectable = item.selectable);

  let circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");

  let UID = "";
  item.id === undefined ? (UID = GenerateUniqueID(24, "CIRC")) : (UID = item.id);

  circle.setAttribute("cx", cx);
  circle.setAttribute("cy", cy);
  circle.setAttribute("r", r);
  circle.setAttribute("id", UID);
  circle.setAttribute("class", "zone ");
  circle.setAttribute("fill", fill);
  circle.setAttribute("locked", locked);
  circle.setAttribute("selectable", selectable);

  let drawing = document.getElementById("drawing");
  drawing.append(circle);

  AttachListener(UID);
  console.log("You've created a circle from parameters!");
}

// Finishes creating a polygon and appends to the dom.  Need to know modesomehow.
export function CreatePolygon(pointsString = "", id = "", classes = "", color = "", locked = "", selectable = "") {
  let polygon = document.createElementNS("http://www.w3.org/2000/svg", "polygon");

  let UID = "";
  UID = id === "" ? (UID = GenerateUniqueID(24, "POLY")) : (UID = id);

  polygon.setAttribute("id", UID);
  classes === "" ? polygon.setAttribute("class", "zone ") : polygon.setAttribute("class", classes);
  polygon.setAttribute("points", pointsString);

  const fill = GetCurrentSelectedColor();

  color === "" ? polygon.setAttribute("fill", fill) : polygon.setAttribute("fill", color);
  locked === "" ? polygon.setAttribute("locked", "false") : polygon.setAttribute("locked", locked);
  selectable === "" ? polygon.setAttribute("selectable", "true") : polygon.setAttribute("selectable", selectable);

  let drawing = document.getElementById("drawing");
  drawing.append(polygon);

  AttachListener(UID);
}

// Determines which mode it is and attached said listener.
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

  if (mode === "move") {
    console.log(`Move mode added to id of ${UID}`);

    let item = SVG("#" + UID);
    item.draggable();
  }
}

// Generates a random points array from a provided length and max number
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

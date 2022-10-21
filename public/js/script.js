import { AddDynamicPolygon, AddSquare, AddTriangle } from "./shapes.js";
import { GenerateUniqueID, GetCurrentMode, GetSelectedColor, TempMessage } from "./helpers.js";
import { selectColor, PaintItem, ChangeToPaintMode, ChangeToCursorMode, ChangeToDeleteMode, CleanListeners } from "./actions.js";

let enabledWButtonID = "btnCursor";
let mode = "cursor";

const wButtons = document.querySelectorAll(".wButton");

// Runs on startup - move to startup function for cleanliness.
Startup();

wButtons.forEach((element) => {
  element.addEventListener("click", (e) => {
    document.getElementById(enabledWButtonID).classList.toggle("enabled");
    element.classList.toggle("enabled");
    enabledWButtonID = e.target.id;

    CleanListeners(mode);

    mode = e.target.id;
    mode = mode.slice(3).toLowerCase();

    if (mode === "cursor") ChangeToCursorMode();
    if (mode === "paint") ChangeToPaintMode();
    if (mode === "delete") ChangeToDeleteMode();
  });
});

const elements = document.querySelectorAll("path");

elements.forEach((element) => {
  element.addEventListener("click", (e) => {
    console.log(e.target);
    console.log(e.currentTarget);
    // e.style.setProperty("fill", "#000000", "");
  });
});

const boxes = document.querySelectorAll(".colorBox");

boxes.forEach((element) => {
  element.addEventListener("click", (e) => {
    selectColor(e.target.id);
  });
});

// sets up initial listener functionalitys on screen.

function Startup() {
  // Sets up work buttons ( to be called action buttons later.)

  document.getElementById("btnReset").addEventListener("click", () => {
    TempMessage("Rest Button Coming Soon.");
  });

  // Sets up create buttons
  document.getElementById("btnAddDynPolygon3").addEventListener("click", () => {
    AddDynamicPolygon(3);
  });

  document.getElementById("btnAddDynPolygon4").addEventListener("click", () => {
    AddDynamicPolygon(4);
  });
  document.getElementById("btnAddDynPolygon5").addEventListener("click", () => {
    AddDynamicPolygon(5);
  });
  document.getElementById("btnAddSquare").addEventListener("click", () => {
    AddSquare();
  });
  document.getElementById("btnAddNewTriangle").addEventListener("click", () => {
    AddTriangle();
  });

  document.getElementById("btnTest1").addEventListener("click", () => {
    console.log("currently testing GetCurrent Mode");
    console.log(GetCurrentMode());
  });
  document.getElementById("btnTest2").addEventListener("click", () => {
    console.log(GetSelectedColor());
  });
  document.getElementById("btnTest3").addEventListener("click", () => {
    GenerateUniqueID();
  });

  ChangeToCursorMode();
}

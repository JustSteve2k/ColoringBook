import { AddDynamicPolygon, AddSquare, AddTriangle } from "./shapes.js";
import { TempMessage, TranslateColor } from "./helpers.js";

let selectedColor = null;
let enabledWButtonID = "btnCursor";
let mode = "cursor";

let cursorCaller = (e) => {
  console.log(e.target);
  console.log(e.target.points[0]);
  console.log(e.target.getAttribute("fill"));
  console.log(e.target.getAttribute("points"));
};

const wButtons = document.querySelectorAll(".wButton");

// Runs on startup - move to startup function for cleanliness.
Startup();

wButtons.forEach((element) => {
  element.addEventListener("click", (e) => {
    document.getElementById(enabledWButtonID).classList.toggle("enabled");
    element.classList.toggle("enabled");
    enabledWButtonID = e.target.id;

    CleanListeners();

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

// Paint item function.  Lets you paint selected svg.
function PaintItem(e) {
  if (selectedColor === null) {
    alert("You need to pick a color first.");
    return;
  }

  let currentItemColor = e.target.classList[1];
  e.target.classList.toggle(currentItemColor);
  e.target.classList.toggle(TranslateColor(selectedColor));
}

function selectColor(selection) {
  console.log(`${selection} was selected!`);

  if (selectedColor != null) document.getElementById(selectedColor).classList.toggle("extraBorder");

  document.getElementById(selection).classList.toggle("extraBorder");
  selectedColor = selection;
  UpdateCurrentColor(selection);
}

// Update the currentColor in the upper right.
function UpdateCurrentColor(selection) {
  let color = "";

  switch (selection) {
    case "box0":
      color = "Blackish";
      break;
    case "box1":
      color = "Purplish";
      break;
    case "box2":
      color = "Greenish";
      break;
    case "box3":
      color = "Redish";
      break;
    case "box4":
      color = "Fuschiaish";
      break;
    case "box5":
      color = "Tealish";
      break;
    case "box6":
      color = "Whiteish";
      break;
  }

  document.getElementById("currentColor").innerText = color;
}

let paintCaller = (e) => PaintItem(e);
let deleteCaller = (e) => alert("this is to be deleted at some Point.");

// Changes event listeners on the svgs to cursor mode.
function ChangeToCursorMode() {
  console.log(`Changing to ${mode} mode.`);

  const zones = document.querySelectorAll(".zone");

  zones.forEach((element) => {
    element.addEventListener("click", cursorCaller);
  });

  console.log("Cursor Mode Added");
}

// Changes event listeners on the svgs to paint mode.
function ChangeToPaintMode() {
  console.log(`Changing to ${mode} mode.`);

  const zones = document.querySelectorAll(".zone");

  zones.forEach((element) => {
    element.addEventListener("click", paintCaller);
  });

  console.log("Paint Mode Added");
}

// Changes event listeners on the svgs to delete mode.
function ChangeToDeleteMode() {
  console.log(`Changing to ${mode} mode.`);

  const zones = document.querySelectorAll(".zone");

  zones.forEach((element) => {
    element.addEventListener("click", deleteCaller);
  });
  console.log("Delete Mode Added");
}

// Cleans the listeners on the svgs so i can add a new one.
function CleanListeners() {
  const zones = document.querySelectorAll(".zone");

  if (mode === "cursor") {
    zones.forEach((element) => {
      element.removeEventListener("click", cursorCaller);
    });
    console.log("Cursor mode removed");
    return;
  }

  if (mode === "paint") {
    zones.forEach((element) => {
      element.removeEventListener("click", paintCaller);
    });
    console.log("Paint mode removed");
    return;
  }

  if (mode === "delete") {
    zones.forEach((element) => {
      element.removeEventListener("click", deleteCaller);
    });
    console.log("Delete mode removed");
    return;
  }
}

// sets up initial listener functionalitys on screen.

function Startup() {
  // Sets up work buttons ( to be called action buttons later.)
  document.getElementById("btnCursor").addEventListener("click", () => {
    TempMessage("Cursor button in testing.");
  });

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

  ChangeToCursorMode();
}

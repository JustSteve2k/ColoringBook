import { AddDynamicPolygon, AddSquare, AddTriangle } from "./shapes.js";
import { GetCurrentMode, GetSelectedColor, TempMessage } from "./helpers.js";
import { selectColor, PaintItem } from "./actions.js";

let enabledWButtonID = "btnCursor";
let mode = "cursor";

let cursorCaller = (e) => {
  console.log(e.target);
  console.log(e.target.points[0]);
  console.log(e.target.getAttribute("fill"));
  console.log(e.target.getAttribute("points"));
  e.target.setAttribute("stroke", "black");
  e.target.setAttribute("stroke-width", "6");
};
let cursorRemover = (e) => {
  e.target.removeAttribute("stroke");
  e.target.removeAttribute("stroke-width");
};

let paintCaller = (e) => PaintItem(e);
let deleteCaller = (e) => {
  let isLocked = e.target.getAttribute("locked");

  if (isLocked != "true") e.target.remove();
  else {
    alert("that thing islocked. you cant delete that.");
  }
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

// Changes event listeners on the svgs to cursor mode.
function ChangeToCursorMode() {
  console.log(`Changing to ${mode} mode.`);

  const zones = document.querySelectorAll(".zone");

  zones.forEach((element) => {
    element.addEventListener("click", cursorCaller);
  });
  zones.forEach((element) => {
    element.addEventListener("blur", cursorRemover);
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
    zones.forEach((element) => {
      element.removeEventListener("blur", cursorRemover);
    });
    console.log("Cursor modes removed");
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
    console.log("not used atm.");
  });

  ChangeToCursorMode();
}

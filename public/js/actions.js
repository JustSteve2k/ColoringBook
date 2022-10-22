import { GetCurrentMode, GetSelectedBox, TranslateColor } from "./helpers.js";

// Paint item function.  Lets you paint selected svg.
export function PaintItem(e) {
  let selectedColor = GetSelectedBox();

  if (selectedColor === null) {
    alert("You need to pick a color first.");
    return;
  }
  if (e.target.getAttribute("locked", true)) {
    alert("Sorry, that target is locked, can't paint that.");
    return;
  }

  let currentItemColor = e.target.classList[1];
  e.target.classList.toggle(currentItemColor);
  e.target.classList.toggle(TranslateColor(selectedColor));
}

export function selectColor(selection) {
  let selectedColor = GetSelectedBox();

  console.log(`${selection} was selected!`);

  if (selectedColor != null) document.getElementById(selectedColor).classList.toggle("extraBorder");

  document.getElementById(selection).classList.toggle("extraBorder");
  selectedColor = selection;
  ConvertBoxSelectionToColorish(selection);
}

// Update the currentColor in the upper right.
function ConvertBoxSelectionToColorish(selection) {
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

export let paintCaller = (e) => PaintItem(e);

export let cursorCaller = (e) => {
  console.log(e.target);
  console.log(e.target.points[0]);
  console.log(e.target.getAttribute("fill"));
  console.log(e.target.getAttribute("points"));
  e.target.setAttribute("stroke", "black");
  e.target.setAttribute("stroke-width", "3");
};

export let cursorRemover = (e) => {
  e.target.removeAttribute("stroke");
  e.target.removeAttribute("stroke-width");
};

export let deleteCaller = (e) => {
  let isLocked = e.target.getAttribute("locked");

  if (isLocked != "true") e.target.remove();
  else {
    alert("that thing islocked. you cant delete that.");
  }
};

// Changes event listeners on the svgs to paint mode.
export function ChangeToPaintMode() {
  let mode = GetCurrentMode();

  console.log(`Changing to ${mode} mode.`);

  const zones = document.querySelectorAll(".zone");

  zones.forEach((element) => {
    element.addEventListener("click", paintCaller);
  });

  console.log("Paint Mode Added");
}

export function ChangeToCursorMode() {
  let mode = GetCurrentMode();

  console.log(`Changing to ${mode} mode.`);

  const zones = document.querySelectorAll(".zone");

  zones.forEach((element) => {
    if (element.getAttribute("isselectable") !== "true") {
      element.addEventListener("focus", cursorCaller);
      element.addEventListener("blur", cursorRemover);
    }
  });

  console.log("Cursor Mode Added");
}

// Changes event listeners on the svgs to delete mode.
export function ChangeToDeleteMode() {
  let mode = GetCurrentMode();

  console.log(`Changing to ${mode} mode.`);

  const zones = document.querySelectorAll(".zone");

  zones.forEach((element) => {
    element.addEventListener("click", deleteCaller);
  });
  console.log("Delete Mode Added");
}

// Cleans the listeners on the svgs so i can add a new one.
export function CleanListeners(mode) {
  const zones = document.querySelectorAll(".zone");

  if (mode === "cursor") {
    zones.forEach((element) => {
      element.removeEventListener("focus", cursorCaller);
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

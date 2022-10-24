import { CreatePolygon } from "./shapes.js";
import { GetCurrentMode, GetSelectedBox, TranslateColor } from "./helpers.js";

// Paint item function.  Lets you paint selected svg.
export function PaintItem(e) {
  let selectedColor = GetSelectedBox();

  if (selectedColor === null) {
    alert("You need to pick a color first.");
    return;
  }
  if (e.target.getAttribute("locked", "true") === "true") {
    console.log(e.target.id);
    console.log(e.target.getAttribute("locked"));
    alert("Sorry, that target is locked, can't paint that.");
    return;
  }

  let currentItemColor = e.target.classList[1];
  e.target.classList.toggle(currentItemColor);
  e.target.classList.toggle(TranslateColor(selectedColor));
}

export function selectColor(selection) {
  let selectedColor = GetSelectedBox();

  // console.log(`${selection} was selected!`);

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
  // console.log(e.target.points[0]);
  // console.log(e.target.getAttribute("fill"));
  // console.log(e.target.getAttribute("points"));
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

  // console.log(`Changing to ${mode} mode.`);

  const zones = document.querySelectorAll(".zone");

  zones.forEach((element) => {
    element.addEventListener("click", paintCaller);
  });

  console.log("Paint Mode Added");
}

export function ChangeToCursorMode() {
  let mode = GetCurrentMode();

  // console.log(`Changing to ${mode} mode.`);

  const zones = document.querySelectorAll(".zone");

  zones.forEach((element) => {
    if (element.getAttribute("selectable") === "true") {
      element.addEventListener("focus", cursorCaller);
      element.addEventListener("blur", cursorRemover);
    }
  });

  console.log("Cursor Mode Added");
}

// Changes event listeners on the svgs to delete mode.
export function ChangeToDeleteMode() {
  let mode = GetCurrentMode();

  // console.log(`Changing to ${mode} mode.`);

  const zones = document.querySelectorAll(".zone");

  zones.forEach((element) => {
    element.addEventListener("click", deleteCaller);
  });
  console.log("Delete Mode Added");
}

// Cleans the listeners on the svgs so i can add a new one.
export function CleanListeners(mode) {
  const zones = document.querySelectorAll(".zone");

  // Slower, so not as effient if you have to go through many items.
  if (mode === "all") {
    zones.forEach((element) => {
      element.removeEventListener("focus", cursorCaller);
      element.removeEventListener("blur", cursorRemover);
      element.removeEventListener("click", paintCaller);
      element.removeEventListener("click", deleteCaller);
    });
    console.log("All modes removed");
    return;
  }

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

export function LockPolygon(id) {
  let target = document.getElementById(id).getAttribute("locked");

  if (target.getAttribute("locked") === "false") target.setAttribute("locked", "true");
  else target.setAttribute("locked", "false");
}

export function ResetBoard(notice = true) {
  let zones = document.querySelectorAll(".zone");
  let count = 0;

  zones.forEach((element) => {
    if (element.getAttribute("locked") != "true") {
      element.remove();
      count++;
    }
  });

  if (notice === true)
    setTimeout(() => {
      count >= 1 ? alert(`${count} items were removed.`) : alert(`Looks like the board is already empty.`);
    }, 0);
}

// Gets info of all polygons on the board.
export function GetInfoOfAllPolygonsOnBoard() {
  let zones = document.querySelectorAll(".zone");
  let log = [];
  let count = 0;

  zones.forEach((element) => {
    let info = {};
    info.id = element.id;
    info.class = element.getAttribute("class");
    info.points = element.getAttribute("points");
    info.fill = element.getAttribute("fill");
    info.locked = element.getAttribute("locked");
    if (info.locked === null) info.locked = "false";
    info.selectable = element.getAttribute("selectable");
    if (info.selectable === null) info.selectable = "false";
    log.push(info);
    count++;
  });

  count == 1 ? console.log("Looks like only the board is there atm.") : console.log(`total of ${count} items catalogued.`);
  console.log(log);
  return log;
}

export function SaveWork() {
  let log = GetInfoOfAllPolygonsOnBoard();

  localStorage.setItem("polygons", JSON.stringify(log));
  alert("work saved i think.");
}

export function ReadWork() {
  let log = [];

  log = JSON.parse(localStorage.getItem("polygons"));
  console.log(log);

  RedrawBoard(log);
}

function RedrawBoard(log) {
  ResetBoard(false);

  console.log(log);

  // Doesnt draw the board so it starts at spot 1.
  for (let x = 1; x < log.length; x++) {
    CreatePolygon(log[x].points, log[x].id, log[x].class, log[x].fill, log[x].locked, log[x].selectable);
  }

  // log.forEach((element) => {
  //   CreatePolygon(element.points, element.id, element.class, element.fill, element.locked, element.selectable);
  // });
}

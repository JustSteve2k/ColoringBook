import { AddCircleFromParams, AddPolygonFromParams } from "./shapes.js";
import { GetCurrentSelectedColor, GetCurrentMode, GetSelectedBox, GetRandomColor } from "./helpers.js";
import Config from "./Config";
import { SVG } from "@svgdotjs/svg.js";
import "@svgdotjs/svg.draggable.js";

let lastAccessedPolygon = null;

// Event listener for painting an item when in paint mode.
export let paintCaller = (e) => {
  let selectedColor = GetSelectedBox();

  if (selectedColor === null) {
    alert("You need to pick a color first.");
    return;
  }
  if (e.target.getAttribute("locked", "true") === "true") {
    console.log(e.target.id);
    console.log(e.target.getAttribute("locked"));
    Config.alerts && alert("Sorry, that target is locked, can't paint that.");
    return;
  }

  let currentColor = GetCurrentSelectedColor();

  e.target.setAttribute("fill", currentColor);
};

// Event listener action when an item is clicked in cursor mode.
export let cursorCaller = (e) => {
  // console.log(e.target);

  e.target.setAttribute("active", "true");
  e.target.setAttribute("stroke", "black");
  e.target.setAttribute("stroke-width", "2");

  if (e.target.nodeName === "polygon" || e.target.nodeName === "circle") {
    lastAccessedPolygon = e.target.id;
  }

  getSelectedItemInfo(e.target);
};

// Event listener action when an item is unclicked in cursor mode.
export let cursorRemover = (e) => {
  e.target.removeAttribute("stroke");
  e.target.removeAttribute("stroke-width");
  e.target.removeAttribute("active");

  let itemInfo = document.querySelector(".itemInfo");
  itemInfo.remove();

  let ul = document.createElement("ul");
  ul.className = "itemInfo";

  let li = document.createElement("li");
  li.textContent = "Nothing Selected";
  ul.appendChild(li);

  let selectedItem = document.querySelector(".selectedItem");
  selectedItem.appendChild(ul);
};

//Adds dragability to all with zone class.
function AddDragabilityToAll() {
  let zone = document.querySelectorAll(".zone");
  console.log(`Found ${zone.length} to add dragability to.`);

  zone.forEach((element) => {
    let name = "#" + element.id;
    let art = SVG(name);
    art.draggable();
    console.log(`Draggable added to - ${name}`);
  });

  // Removes dragability from background added unnecessarily.
  let art = SVG("#svgBackground").draggable(false);
}

//Removes dragability to all with zone class.
function RemoveDragabilityFromAll() {
  let zone = document.querySelectorAll(".zone");

  zone.forEach((element) => {
    let name = "#" + element.id;
    let art = SVG(name);
    art.draggable(false);
    console.log(`Draggable removed from - ${name}`);
  });
}

// Gets the type
function getSelectedItemInfo(selected) {
  let nodeName = selected.nodeName;

  if (Config.selectedOutput) {
    console.log("The selected item is - ");
    console.log(selected.id);
    console.log(nodeName);
    console.log(selected.getAttribute("class"));
    console.log(selected.getAttribute("points"));
    console.log(selected.getAttribute("fill"));
    console.log(selected.getAttribute("selectable"));
    console.log(selected.getAttribute("active"));
  }

  let itemInfo = document.querySelector(".itemInfo");
  if (itemInfo !== null) itemInfo.remove();

  let selectedItem = document.querySelector(".selectedItem");
  let ul = document.createElement("ul");
  ul.className = "itemInfo";

  createListItem("===ID===");
  createListItem(selected.nodeName);

  createListItem("===NodeName===");
  createListItem(selected.getAttribute("id"));

  if (nodeName === "polygon") {
    createListItem("===Points===");
    createListItem(selected.getAttribute("points"));
  }

  if (nodeName === "circle") {
    createListItem("===Cx===");
    createListItem(selected.getAttribute("cx"));

    createListItem("===Cy===");
    createListItem(selected.getAttribute("cy"));

    createListItem("===Radius===");
    createListItem(selected.getAttribute("r"));
  }

  createListItem("===Fill===");
  createListItem(selected.getAttribute("fill"));

  createListItem("===Selectable===");
  createListItem(selected.getAttribute("selectable"));

  createListItem("===Locked===");
  createListItem(selected.getAttribute("locked"));

  selectedItem.appendChild(ul);

  // Creates a list item with the entered parameter.
  function createListItem(attr) {
    let li = document.createElement("li");
    li.textContent = attr;
    return ul.appendChild(li);
  }
}

// Event listener action for deleting a selected item.
export let deleteCaller = (e) => {
  let isLocked = e.target.getAttribute("locked");

  if (isLocked != "true") {
    e.target.remove();
    lastAccessedPolygon = null;
  } else {
    alert("that thing islocked. you cant delete that.");
  }
};

// Changes event listeners on the svgs to paint mode.
export function ChangeToPaintMode(verbose = false) {
  let mode = GetCurrentMode();

  // console.log(`Changing to ${mode} mode.`);

  const zones = document.querySelectorAll(".zone");

  zones.forEach((element) => {
    element.addEventListener("click", paintCaller);
  });

  verbose && console.log("Paint Mode Added");
}

// Changes event listeners on the svgs to cursor mode.
export function ChangeToCursorMode(verbose = false) {
  let mode = GetCurrentMode();

  // console.log(`Changing to ${mode} mode.`);

  const zones = document.querySelectorAll(".zone");

  zones.forEach((element) => {
    if (element.getAttribute("selectable") === "true") {
      element.addEventListener("focus", cursorCaller);
      element.addEventListener("blur", cursorRemover);
    }
  });

  verbose && console.log("Cursor Mode Added");
}

// Changes event listeners on the svgs to delete mode.
export function ChangeToDeleteMode(verbose = false) {
  let mode = GetCurrentMode();

  // console.log(`Changing to ${mode} mode.`);

  const zones = document.querySelectorAll(".zone");

  zones.forEach((element) => {
    element.addEventListener("click", deleteCaller);
  });

  verbose && console.log("Delete Mode Added");
}

// Changes event listeners on the svgs to be draggable.
export function ChangeToMoveMode(verbose = false) {
  AddDragabilityToAll();

  verbose && console.log("Move Mode Added");
}

let enabledWButtonID = "btnCursor";
let mode = "cursor";

// Not working yet, but calls function to change modes and removes previous listeners.
// DEV NOTE - make new mode a parameter to set a specific mode. Later.
export function SwapBetweenModes() {
  // Adds functionality to mode buttons.
  const wButtons = document.querySelectorAll(".wButton");

  wButtons.forEach((element) => {
    element.addEventListener("click", (e) => {
      document.getElementById(enabledWButtonID).classList.toggle("enabled");
      element.classList.toggle("enabled");
      enabledWButtonID = e.target.id;

      // CleanListeners(mode);
      CleanListeners("all");

      mode = e.target.id;
      mode = mode.slice(3).toLowerCase();

      if (mode === "cursor") ChangeToCursorMode();
      if (mode === "paint") ChangeToPaintMode();
      if (mode === "delete") ChangeToDeleteMode();
      if (mode === "move") ChangeToMoveMode();
    });
  });
}

// Cleans the listeners on the svgs so i can add a new one.
export function CleanListeners(mode, verbose = false) {
  const zones = document.querySelectorAll(".zone");

  // Slower, so not as effient if you have to go through many items, but simpler code.
  if (mode === "all") {
    zones.forEach((element) => {
      element.removeEventListener("focus", cursorCaller);
      element.removeEventListener("blur", cursorRemover);
      element.removeEventListener("click", paintCaller);
      element.removeEventListener("click", deleteCaller);

      // Removes dragable functionality.
      RemoveDragabilityFromAll();
    });

    verbose && console.log("All modes removed");

    return;
  }

  if (mode === "cursor") {
    zones.forEach((element) => {
      element.removeEventListener("focus", cursorCaller);
      element.removeEventListener("blur", cursorRemover);
    });

    verbose && console.log("Cursor modes removed");

    return;
  }

  if (mode === "paint") {
    zones.forEach((element) => {
      element.removeEventListener("click", paintCaller);
    });

    verbose && console.log("Paint mode removed");

    return;
  }

  if (mode === "delete") {
    zones.forEach((element) => {
      element.removeEventListener("click", deleteCaller);
    });

    verbose && console.log("Delete mode removed");

    return;
  }
}

// Only can lock stuff in click mode later.
export function LockPolygon() {
  // Get last active polygon with query select all looking for active=true attribute.
  // Set attribute locked or unlocked.

  let target = document.getElementById(lastAccessedPolygon);

  console.log(target);

  if (target.getAttribute("locked") === "false") {
    target.setAttribute("locked", "true");
    console.log(`${lastAccessedPolygon} was locked.`);
  } else {
    target.setAttribute("locked", "false");
    console.log(`${lastAccessedPolygon} was unlocked.`);
  }
}

// Removes all objects from the board.
export function ResetBoard(notice = true) {
  let zones = document.querySelectorAll(".zone");
  let count = 0;

  let answer;

  if (notice) {
    answer = confirm("Are you sure you want to reset?");

    if (!answer) return;
  }

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
// May move to savers?
export function GetInfoOfAllPolygonsOnBoard() {
  let zones = document.querySelectorAll(".zone");
  let log = [];
  let count = 0;

  zones.forEach((element) => {
    let info = {};
    info.id = element.id;
    info.class = element.getAttribute("class");
    info.type = element.nodeName;
    if (element.nodeName === "polygon") info.points = element.getAttribute("points");
    if (element.nodeName === "circle") {
      info.r = element.getAttribute("r");
      info.cx = element.getAttribute("cx");
      info.cy = element.getAttribute("cy");
    }
    info.fill = element.getAttribute("fill");
    info.locked = element.getAttribute("locked");
    if (info.locked === null) info.locked = "false";
    info.selectable = element.getAttribute("selectable");
    if (info.selectable === null) info.selectable = "false";
    log.push(info);
    count++;
  });

  count == 1 ? console.log("Looks like only the board is there atm.") : console.log(`total of ${count} items catalogued.`);
  // console.log(log);
  return log;
}

export function ReadWork() {
  let log = [];

  let fileName = prompt("What save would you like to load?");

  log = JSON.parse(localStorage.getItem("CB - " + fileName));

  console.log(log);

  RedrawBoard(log);
}

// Redraws the board with provided parameters.
export function RedrawBoard(log) {
  ResetBoard(false);

  console.log(log);

  // Doesn't draw the board so it starts at spot 1.
  for (let x = 1; x < log.length; x++) {
    let item = ConvertEntryToObject(log[x]);

    if (item.type === "polygon") {
      AddPolygonFromParams(item);
    } else if (item.type === "circle") {
      AddCircleFromParams(item);
    }
  }
}

// Cleans up object in array of objects be shaped properly.
function ConvertEntryToObject(log) {
  let item = {
    type: log.type,
    id: log.id,
    classList: log.class,
    fill: log.fill,
    locked: log.locked,
    selectable: log.selectable,
  };

  if (item.type === "polygon") {
    item.points = log.points;
  }
  if (item.type === "circle") {
    item.r = log.r;
    item.cx = log.cx;
    item.cy = log.cy;
  }

  return item;
}

// Sets the colorpicker to a random color.  Sets a specific value if one is provided.
// DEV NOTE - Need to validate input provided to ensure a color provided works.
export function SetNewColor(color = "") {
  if (color !== "") document.querySelector(".colorPicker").value = color;

  document.querySelector(".colorPicker").value = GetRandomColor();
}

// Changes the background size
export function ChangeBackgroundSize() {
  drawing.setAttribute("width", "1200");
  drawing.setAttribute("viewbox", "0 0 1200 600");

  svgBackground.setAttribute("points", "-50,0 -50,600 1200,600 300,-50");

  // points="0,0 0,600 900,600 900,0"
  // UL, BL, BR, UR
}

export function EnableDevMode(e) {
  console.log(e.target.checked);
  let devButtons = document.querySelector(".devButtons");

  if (e.target.checked) {
    console.log("devMode is enabled");
    devButtons.classList.toggle("hidden");
  } else {
    console.log("devMode is disabled");
    devButtons.classList.toggle("hidden");
  }
}

// Creates a modal and adds message provided from Config file.
export function CreateModal() {
  let div = document.createElement("div");
  div.setAttribute("class", "modalBackground");

  let modal = document.createElement("div");
  modal.setAttribute("class", "modal");

  let p = document.createElement("p");
  p.innerHTML = Config.modalMessage;

  let button = document.createElement("button");
  button.setAttribute("class", "modalButton");
  button.textContent = "Ok";

  modal.append(button);
  modal.append(p);
  div.append(modal);

  let container = document.querySelector(".container");
  container.append(div);

  button.addEventListener("click", RemoveModal);
}

// Removes modal from DOM.
function RemoveModal() {
  let element = document.querySelector(".modalBackground");
  element.remove();
}

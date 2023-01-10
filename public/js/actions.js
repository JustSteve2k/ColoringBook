import { AddCircleFromParams, CreatePolygon } from "./shapes.js";
import { GetCurrentSelectedColor, GetCurrentMode, GetSelectedBox, GetRandomColor } from "./helpers.js";

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
    alert("Sorry, that target is locked, can't paint that.");
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
  e.target.setAttribute("stroke-width", "3");

  if (e.target.nodeName === "polygon" || e.target.nodeName === "circle") {
    lastAccessedPolygon = e.target.id;
  }

  getSelectedItemInfo(e.target)
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

// Gets the type 
function getSelectedItemInfo(selected){
  let nodeName = selected.nodeName;
  
  console.log("The selected item is - ");
  
  console.log(selected.id);
  console.log(nodeName);
  console.log(selected.getAttribute("class"));
  console.log(selected.getAttribute("points"));
  console.log(selected.getAttribute("fill"));
  console.log(selected.getAttribute("selectable"));
  console.log(selected.getAttribute("active"));


  let itemInfo = document.querySelector(".itemInfo");
  itemInfo.remove();

  // console.log(selected);
  let selectedItem = document.querySelector(".selectedItem");
  let ul = document.createElement("ul")
  ul.className = "itemInfo"
  
  let li = document.createElement("li");
  li.textContent = "===ID===";
  ul.appendChild(li);  

  li = document.createElement("li");
  li.textContent = selected.getAttribute("id");
  ul.appendChild(li);  

  li = document.createElement("li");
  li.textContent = "===NodeName===";
  ul.appendChild(li);  

  li = document.createElement("li");
  li.textContent = selected.nodeName;
  ul.appendChild(li);  

  if(nodeName === "polygon"){
    li = document.createElement("li");
    li.textContent = "===Points===";
    ul.appendChild(li);  
  
    li = document.createElement("li");
    li.textContent = selected.getAttribute("points");
    ul.appendChild(li);  
  }

  if(nodeName === "circle"){
    li = document.createElement("li");
    li.textContent = "===Cx===";
    ul.appendChild(li);  
  
    li = document.createElement("li");
    li.textContent = selected.getAttribute("cx");
    ul.appendChild(li);  

    li = document.createElement("li");
    li.textContent = "===Cy===";
    ul.appendChild(li);  
  
    li = document.createElement("li");
    li.textContent = selected.getAttribute("cy");
    ul.appendChild(li);  

    li = document.createElement("li");
    li.textContent = "===Radius===";
    ul.appendChild(li);  
  
    li = document.createElement("li");
    li.textContent = selected.getAttribute("r");
    ul.appendChild(li);  
  }

  li = document.createElement("li");
  li.textContent = "===Fill===";
  ul.appendChild(li);  
    
  li = document.createElement("li");
  li.textContent = selected.getAttribute("fill");
  ul.appendChild(li);  

  li = document.createElement("li");
  li.textContent = "===Selectable===";
  ul.appendChild(li);  

  li = document.createElement("li");
  li.textContent = selected.getAttribute("selectable");
  ul.appendChild(li);  

  li = document.createElement("li");
  li.textContent = "===Locked===";
  ul.appendChild(li);  

  li = document.createElement("li");
  li.textContent = selected.getAttribute("locked");
  ul.appendChild(li);  

  selectedItem.appendChild(ul);

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

  // log = JSON.parse(localStorage.getItem("polygons"));
  log = JSON.parse(localStorage.getItem("CB - " + fileName));

  console.log(log);

  RedrawBoard(log);
}

export function RedrawBoard(log) {
  ResetBoard(false);

  console.log(log);

  // Doesnt draw the board so it starts at spot 1.
  for (let x = 1; x < log.length; x++) {
    // console.log(`Looping ${x} times`);
    if (log[x].type === "polygon") {
      CreatePolygon(log[x].points, log[x].id, log[x].class, log[x].fill, log[x].locked, log[x].selectable);
    } else if (log[x].type === "circle") {
      AddCircleFromParams(log[x].id, log[x].class, log[x].cx, log[x].cy, log[x].r, log[x].fill, log[x].locked, log[x].selectable);
    }
  }
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

  // alert("background updated!");
}

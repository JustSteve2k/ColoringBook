/* istanbul ignore next */
import Config from "./Config";

// Creates an alert with the provided parameter.
export function TempMessage(message) {
  alert(message);
}

// Adds two numbers
export function Sum(a, b) {
  return a + b;
}

// Returns a random number, if no params,
export function GetRandomInt(maxNumber = 2) {
  return Math.floor(Math.random() * maxNumber);
}

// Finds current mode by seeing which wButton is enabled.
export function GetCurrentMode(announce = false) {
  let elements = document.querySelectorAll(".wButton");
  let find = "";

  elements.forEach((element) => {
    if (element.classList.contains("enabled")) find = element.id;
  });

  find = find.slice(3).toLowerCase();

  if (announce) console.log(`The current mode is ${find}`);

  return find;
}

// Returns what box is selected - ex: box1, box2
export function GetSelectedBox() {
  let elements = document.querySelectorAll(".colorBox");
  let find = "";

  elements.forEach((element) => {
    if (element.classList.contains("extraBorder")) find = element.id;
  });

  return find;
}

// Generates a uniquie id of legnth required by parameter
export function GenerateUniqueID(length = 24, type = "") {
  let idArray = [];
  let uniqueID = "";
  let character = "";
  let num = 0;

  type === "" ? idArray.push("GENE") : idArray.push(type);

  for (let x = 0; x < length - 4; x++) {
    num = GetRandomInt(36);

    if (num < 10) idArray.push(num);
    else if (num >= 10) {
      character = String.fromCharCode(87 + num);
      if (GetRandomInt(2) === 1) character = character.toUpperCase();
      idArray.push(character);
    }
  }

  uniqueID = idArray.join("");
  // console.log(`Unique ID with length of ${length} is generated as ${uniqueID}`);
  return uniqueID;
}

// Returns the current color value
export function GetCurrentSelectedColor() {
  const currColor = document.querySelector(".colorPicker");

  Config.colorSelectedOutput && console.log(`The current color is ${currColor.value}`);

  return currColor.value;
}

// Gets a random color and returns that.
export function GetRandomColor() {
  var letters = "0123456789ABCDEF".split("");
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.round(Math.random() * 15)];
  }
  Config.colorSelectedOutput && console.log(`Random Color is ${color}`);

  return color;
}

// Adds hover functionality to lower buttons
export function AddHoverFunctionality() {
  const list = {
    btnCursor: "Changes to cursor mode that tells info about an item.",
    btnPaint: "Changes to paint mode, allowing you to color items with the selected color.",
    btnDelete: "Changs to delete mode, allowing you to remove items from the board.",
    btnMove: "Changes to move mode allowing you to relocate items around the board.",
    btnAddDynPolygon3: "Adds a dynamic 3 sided polygon.",
    btnAddDynPolygon4: "Adds a dynamic 4 sided polygon.",
    btnAddDynPolygon5: "Adds a dynamic 5 sided polygon.",
    btnAddSquare: "Adds a square.",
    btnAddNewTriangle: "Adds a triangle.",
    btnAddNewCircle: "Adds a circle.",
    btnLock: "Locks the selected item.",
    btnSave: "Saves your file.",
    btnLoad: "Loads a file.",
    btnDeleteFile: "Allows you to delete a file.",
    btnResetNew: "Resets board back to a clean slate.",
    btnSetRandomColor: "Changes the color to a random one.",
  };

  let buttons = document.querySelectorAll(".smButton, .medButton");

  buttons.forEach((element) => {
    let item = document.getElementById(element.id);

    item.addEventListener("mouseover", () => {
      ShowHoverText(list[element.id]);
    });

    item.addEventListener("mouseout", () => {
      let l = document.getElementById("hoverText");
      l.remove();
    });
  });
}

export function ShowHoverText(words) {
  let div = document.createElement("div");
  div.id = "hoverText";
  div.className = "hoverText";
  div.textContent = words;

  let bar = document.querySelector(".middleArea");

  bar.append(div);
}

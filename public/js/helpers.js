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

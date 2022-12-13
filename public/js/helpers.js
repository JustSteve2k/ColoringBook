/* istanbul ignore next */
export function TempMessage(message) {
  alert(message);
}

export function TranslateColor(selection) {
  switch (selection) {
    case "box0":
      return "color0";
    case "box1":
      return "color1";
    case "box2":
      return "color2";
    case "box3":
      return "color3";
    case "box4":
      return "color4";
    case "box5":
      return "color5";
    case "box6":
      return "color6";
    default:
      return "color0";
  }
}

export function Sum(a, b) {
  return a + b;
}

export function GetRandomInt(maxNumber = 1) {
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

export function GenerateUniqueID(length = 24) {
  let idArray = [];
  let uniqueID = "";
  let character = "";
  let num = 0;

  for (let x = 0; x < length; x++) {
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

export function GetCurrentSelectedColor() {
  const currColor = document.querySelector(".colorPicker");

  console.log(`The current color is ${currColor.value}`);
  return currColor.value;
}

export function GetRandomColor() {
  var letters = "0123456789ABCDEF".split("");
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.round(Math.random() * 15)];
  }
  console.log(`Random Color is ${color}`);

  return color;
}

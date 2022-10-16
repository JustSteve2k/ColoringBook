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
export function GetCurrentMode() {
  let elements = document.querySelectorAll(".wButton");
  let find = "";

  elements.forEach((element) => {
    if (element.classList.contains("enabled")) find = element.id;
  });

  find = find.slice(3).toLowerCase();

  return find;
}

export function GetSelectedColor() {
  let elements = document.querySelectorAll(".colorBox");
  let find = "";

  elements.forEach((element) => {
    if (element.classList.contains("extraBorder")) find = element.id;
  });

  return find;

  // let elements = document.querySelectorAll(".extraBorder");
}

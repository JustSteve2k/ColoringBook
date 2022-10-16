import { GetSelectedColor, TranslateColor } from "./helpers.js";

// Paint item function.  Lets you paint selected svg.
export function PaintItem(e) {
  let selectedColor = GetSelectedColor();

  if (selectedColor === null) {
    alert("You need to pick a color first.");
    return;
  }

  let currentItemColor = e.target.classList[1];
  e.target.classList.toggle(currentItemColor);
  e.target.classList.toggle(TranslateColor(selectedColor));
}

export function selectColor(selection) {
  let selectedColor = GetSelectedColor();

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

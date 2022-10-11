// alert("works!");
let selectedColor = null;

const zones = document.querySelectorAll(".zone");

zones.forEach((element) => {
  element.addEventListener("click", (e) => {
    PaintItem(e);
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

console.log(boxes);

boxes.forEach((element) => {
  element.addEventListener("click", (e) => {
    selectColor(e.target.id);
  });
});

function PaintItem(e) {
  if (selectedColor === null) {
    alert("You need to pick a color first.");
    return;
  }

  let currentItemColor = e.target.classList[1];
  e.target.classList.toggle(currentItemColor);
  e.target.classList.toggle(TranslateColor(selectedColor));
}

function selectColor(selection) {
  console.log(`${selection} was selected!`);

  if (selectedColor != null) document.getElementById(selectedColor).classList.toggle("extraBorder");

  document.getElementById(selection).classList.toggle("extraBorder");
  selectedColor = selection;
  UpdateCurrentColor(selection);
}

// Update the currentColor in the upper right.
function UpdateCurrentColor(selection) {
  let color = "";

  switch (selection) {
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
  }

  document.getElementById("currentColor").innerText = color;
}

function TranslateColor(selection) {
  let color = "";

  switch (selection) {
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
  }
}

// console.log(elements);

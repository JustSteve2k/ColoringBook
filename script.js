// alert("works!");
let selectedColor = null;

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

function selectColor(selection) {
  console.log(`${selection} was selected!`);
  if (selectedColor != null) document.getElementById(selectedColor).classList.toggle("extraBorder");

  document.getElementById(selection).classList.toggle("extraBorder");
  selectedColor = selection;
}

// console.log(elements);

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

// console.log(boxes);

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

function AddNewPolygon() {
  // alert("add new polygon");
  let polygon = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
  polygon.setAttribute("class", "zone color1");
  polygon.setAttribute("points", "525,25 600,25 600,100 525,100");
  polygon.setAttribute("fill", "#000000");
  let drawing = document.getElementById("drawing");
  drawing.append(polygon);
}

function AddDynamicPolygon(points) {
  // alert("add new polygon");
  let pointsX = [];
  let pointsY = [];

  let MaxX = 650;
  let MaxY = 650;

  for (let x = 0; x < points; x++) {
    pointsX[x] = Math.floor(Math.random() * MaxX);
  }

  for (let x = 0; x < points; x++) {
    pointsY[x] = Math.floor(Math.random() * MaxY);
  }

  console.log(pointsX);
  console.log(pointsY);

  let pointsString = "";

  for (let x = 0; x < points; x++) {
    pointsString += pointsX[x].toString();
    pointsString += ",";
    pointsString += pointsY[x].toString();
    pointsString += " ";
  }

  console.log(`The generated string is - ${pointsString}`);

  let polygon = document.createElementNS("http://www.w3.org/2000/svg", "polygon");

  polygon.setAttribute("class", "zone color0");
  polygon.setAttribute("points", pointsString);
  polygon.setAttribute("fill", "currentcolor");

  polygon.addEventListener("click", (e) => {
    PaintItem(e);
  });

  // element.addEventListener("click", (e) => {
  //   PaintItem(e);
  // });

  let drawing = document.getElementById("drawing");

  drawing.append(polygon);
}

function AddSquare() {
  // alert("add new polygon");
  let polygon = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
  polygon.setAttribute("class", "zone color1");
  polygon.setAttribute("points", "525,25 600,25 600,100 525,100");
  polygon.setAttribute("fill", "#000000");
  let drawing = document.getElementById("drawing");
  drawing.append(polygon);
}

function AddSquare() {
  // alert("add new polygon");

  let MaxX = 540;
  let MaxY = 500;

  let pointsX = [25, 100, 100, 25];
  let pointsY = [25, 25, 100, 100];

  let adjustX = Math.floor(Math.random() * MaxX);
  let adjustY = Math.floor(Math.random() * MaxY);

  let pointsString = "";

  for (let x = 0; x < 4; x++) {
    pointsString += (pointsX[x] + adjustX).toString();
    pointsString += ",";
    pointsString += (pointsY[x] + adjustY).toString();
    pointsString += " ";
  }

  console.log(`The generated string is - ${pointsString}`);

  let polygon = document.createElementNS("http://www.w3.org/2000/svg", "polygon");

  polygon.setAttribute("class", "zone color0");
  polygon.setAttribute("points", pointsString);
  polygon.setAttribute("fill", "currentcolor");

  polygon.addEventListener("click", (e) => {
    PaintItem(e);
  });

  // element.addEventListener("click", (e) => {
  //   PaintItem(e);
  // });

  let drawing = document.getElementById("drawing");

  drawing.append(polygon);
}

function AddTriangle() {
  // alert("add new polygon");

  let MaxX = 540;
  let MaxY = 500;

  let pointsX = [50, 0, 100];
  let pointsY = [0, 100, 100];

  let adjustX = Math.floor(Math.random() * MaxX);
  let adjustY = Math.floor(Math.random() * MaxY);

  let pointsString = "";

  for (let x = 0; x < 3; x++) {
    pointsString += (pointsX[x] + adjustX).toString();
    pointsString += ",";
    pointsString += (pointsY[x] + adjustY).toString();
    pointsString += " ";
  }

  console.log(`The generated string is - ${pointsString}`);

  let polygon = document.createElementNS("http://www.w3.org/2000/svg", "polygon");

  polygon.setAttribute("class", "zone color0");
  polygon.setAttribute("points", pointsString);
  polygon.setAttribute("fill", "currentcolor");

  polygon.addEventListener("click", (e) => {
    PaintItem(e);
  });

  // element.addEventListener("click", (e) => {
  //   PaintItem(e);
  // });

  let drawing = document.getElementById("drawing");

  drawing.append(polygon);
}

// console.log(elements);

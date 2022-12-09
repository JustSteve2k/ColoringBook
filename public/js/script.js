import { AddDynamicPolygon, AddSquare, AddTriangle, AddCircle } from "./shapes.js";
import { GetCurrentSelectedColor, GetCurrentMode, TempMessage } from "./helpers.js";
import {
  selectColor,
  ChangeBackgroundSize,
  ChangeToPaintMode,
  ChangeToCursorMode,
  ChangeToDeleteMode,
  CleanListeners,
  ResetBoard,
  ReadWork,
  LockPolygon,
} from "./actions.js";
import { DeleteSaveFile, FindAllSavesAndUpdateList, SaveWork } from "./savers.js";
import Developer from "./Dev.js";

let enabledWButtonID = "btnCursor";
let mode = "cursor";

// Runs on startup - move to startup function for cleanliness.
Startup();

const elements = document.querySelectorAll("path");

elements.forEach((element) => {
  element.addEventListener("click", (e) => {
    console.log(e.target);
    console.log(e.currentTarget);
  });
});

// sets up initial listener functionalitys on screen.
function Startup() {
  // Sets up work buttons ( to be called action buttons later.)

  // Sets up create buttons
  document.getElementById("btnAddDynPolygon3").addEventListener("click", () => {
    AddDynamicPolygon(3);
  });

  document.getElementById("btnAddDynPolygon4").addEventListener("click", () => {
    AddDynamicPolygon(4);
  });
  document.getElementById("btnAddDynPolygon5").addEventListener("click", () => {
    AddDynamicPolygon(5);
  });
  document.getElementById("btnAddSquare").addEventListener("click", () => {
    AddSquare();
  });
  document.getElementById("btnAddNewTriangle").addEventListener("click", () => {
    AddTriangle();
  });
  document.getElementById("btnAddNewCircle").addEventListener("click", () => {
    AddCircle();
  });
  document.getElementById("btnLock").addEventListener("click", () => {
    LockPolygon();
  });

  document.getElementById("btnSave").addEventListener("click", () => {
    SaveWork();
  });
  document.getElementById("btnLoad").addEventListener("click", () => {
    ReadWork();
  });
  document.getElementById("btnDeleteFile").addEventListener("click", () => {
    DeleteSaveFile();
  });
  document.getElementById("btnResetNew").addEventListener("click", () => {
    ResetBoard();
  });

  // Adds select color functionality to the color buttons.
  const boxes = document.querySelectorAll(".colorBox");

  boxes.forEach((element) => {
    element.addEventListener("click", (e) => {
      selectColor(e.target.id);
    });
  });

  // Adds functionality to mode buttons.
  const wButtons = document.querySelectorAll(".wButton");

  wButtons.forEach((element) => {
    element.addEventListener("click", (e) => {
      document.getElementById(enabledWButtonID).classList.toggle("enabled");
      element.classList.toggle("enabled");
      enabledWButtonID = e.target.id;

      CleanListeners(mode);

      mode = e.target.id;
      mode = mode.slice(3).toLowerCase();

      if (mode === "cursor") ChangeToCursorMode();
      if (mode === "paint") ChangeToPaintMode();
      if (mode === "delete") ChangeToDeleteMode();
    });
  });

  ChangeToCursorMode();

  const Dev = new Developer();
  Dev.setupDevButtonListeners();

  // Windows onload functions, adjust later to load multiple things loading.
  window.onload = FindAllSavesAndUpdateList;
}

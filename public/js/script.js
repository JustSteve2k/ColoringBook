import { AddDynamicPolygon, AddSquare, AddTriangle, AddCircle } from "./shapes.js";
import { ChangeToCursorMode, ResetBoard, ReadWork, SwapBetweenModes, LockPolygon, SetNewColor } from "./actions.js";
import { DeleteSaveFile, FindAllSavesAndUpdateList, SaveWork } from "./savers.js";
import { GetRandomColor } from "./helpers.js";
import Developer from "./Dev.js";
import Data from "./Data.js";

// let boardSizeX = 900;
// let boardSizeY = 600;

// Windows onload functions, adjust later to load multiple things loading.
window.onload = Startup;

// sets up initial listener functionalitys on screen.
function Startup() {
  // Sets up Action buttons
  btnAddDynPolygon3.addEventListener("click", () => {
    AddDynamicPolygon(3);
  });
  btnAddDynPolygon4.addEventListener("click", () => {
    AddDynamicPolygon(4);
  });
  btnAddDynPolygon5.addEventListener("click", () => {
    AddDynamicPolygon(5);
  });
  btnAddSquare.addEventListener("click", () => {
    AddSquare();
  });
  btnAddNewTriangle.addEventListener("click", () => {
    AddTriangle();
  });
  btnAddNewCircle.addEventListener("click", () => {
    AddCircle();
  });
  btnLock.addEventListener("click", () => {
    LockPolygon();
  });
  btnSave.addEventListener("click", () => {
    SaveWork();
  });
  btnLoad.addEventListener("click", () => {
    ReadWork();
  });
  btnDeleteFile.addEventListener("click", () => {
    DeleteSaveFile();
  });
  btnResetNew.addEventListener("click", () => {
    ResetBoard();
  });
  btnSetRandomColor.addEventListener("click", () => {
    SetNewColor();
  });

  devModeCheckbox.addEventListener("change", (e) => {
    console.log(e.target.checked);
    let devButtons = document.querySelector(".devButtons");

    if (e.target.checked) {
      console.log("devMode is enabled");
      devButtons.classList.toggle("hidden");
    } else {
      console.log("devMode is disabled");
      devButtons.classList.toggle("hidden");
    }
  });

  // Other startup functionality.
  SwapBetweenModes();
  ChangeToCursorMode();

  let colorPicker = document.querySelector(".colorPicker");
  Data.randomColorAtStart ? (colorPicker.value = GetRandomColor()) : (colorPicker.value = "#000000");

  FindAllSavesAndUpdateList();

  const Dev = new Developer();
  Dev.setupDevButtonListeners();
}

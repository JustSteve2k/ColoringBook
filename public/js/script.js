import { AddDynamicPolygon, AddSquare, AddTriangle, AddCircleFromParams } from "./shapes.js";
import { ChangeToCursorMode, CreateModal, EnableDevMode, ResetBoard, ReadWork, SwapBetweenModes, LockPolygon, SetNewColor } from "./actions.js";
import { DeleteSaveFile, FindAllSavesAndUpdateList, SaveWork } from "./savers.js";
import { AddHoverFunctionality, GetRandomColor } from "./helpers.js";
import Developer from "./Dev.js";
import Config from "./Config.js";

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
    AddCircleFromParams();
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

  // Dev mode checkbox functionality.
  devModeCheckbox.addEventListener("change", (e) => {
    EnableDevMode(e);
  });

  // Other startup functionality.

  AddHoverFunctionality();
  SwapBetweenModes();
  ChangeToCursorMode();

  let colorPicker = document.querySelector(".colorPicker");
  Config.randomColorAtStart ? (colorPicker.value = GetRandomColor()) : (colorPicker.value = "#000000");

  FindAllSavesAndUpdateList();
  Config.modal && CreateModal();

  const Dev = new Developer();
  Dev.CreateDevButtons(9);
  Dev.setupDevButtonListeners();
}

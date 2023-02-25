import { GetCurrentMode } from "./helpers.js";
import { GetInfoOfAllPolygonsOnBoard } from "./actions.js";
import { CreateExportString, ImportString, FindAllLocalStorage } from "./savers.js";
import { AddHoverFunctionality, GetRandomInt, ShowHoverText } from "./helpers.js";
import Config from "./Config";

export default class Developer {
  constructor() {
    this.onload();
  }

  test() {
    alert("test function");
  }

  setupDevButtonListeners() {
    this.SetButtonLabel("btnDev1", "Test Function");

    btnDev1.addEventListener("click", () => {
      alert("testFunctionWorks!");
    });

    this.SetButtonLabel("btnDev2", "Get Info of All Polygons");

    btnDev2.addEventListener("click", () => {
      this.tempMessage("Gets list of all the polygons on the board, look at the console.");
      GetInfoOfAllPolygonsOnBoard();
    });

    this.SetButtonLabel("btnDev3", "Get Current Mode");

    btnDev3.addEventListener("click", () => {
      this.tempMessage("Gets the Current Mode, look at the console.");
      GetCurrentMode(true);
    });

    this.SetButtonLabel("btnDev4", "Find all Local Storage");

    btnDev4.addEventListener("click", () => {
      this.tempMessage("Find All Local Saves");
      FindAllLocalStorage();
    });

    this.SetButtonLabel("btnDev5", "Get Random Int");

    btnDev5.addEventListener("click", () => {
      let num = GetRandomInt();
      console.log(num);
    });

    this.SetButtonLabel("btnDev6", "Export String");

    btnDev6.addEventListener("click", () => {
      CreateExportString();
    });

    this.SetButtonLabel("btnDev7", "Import String");

    btnDev7.addEventListener("click", () => {
      ImportString();
    });

    this.SetButtonLabel("btnDev8", "Test Draw Button");

    btnDev8.addEventListener("click", () => {
      var draw = SVG().addTo("#drawing");
      draw.rect(100, 200).fill("#a06");
    });

    this.SetButtonLabel("btnDev9", "Replacement Text");

    btnDev9.addEventListener("click", () => {
      AddHoverFunctionality();
    });
  }

  tempMessage(message) {
    alert(message);
    console.log(message);
  }

  SetButtonLabel(id, text) {
    document.getElementById(id).innerText = text;
  }

  // showBoardSize() {
  //   console.log(`The current board size is X:${boardSizeX} and Y:${boardSizeY}`);
  //   boardSizeX++;
  // }

  // Functions to do when loading file.
  onload() {
    Config.devOutput && console.log("dev class functions loaded");
  }
}

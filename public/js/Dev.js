import { GetCurrentMode } from "./helpers.js";
import { GetInfoOfAllPolygonsOnBoard } from "./actions.js";
import { FindAllLocalStorage } from "./savers.js";
import { GetRandomInt } from "./helpers.js";
// import { boardSizeX, boardSizeY } from "./script.js";

export default class Developer {
  constructor() {
    this.onload();
  }

  test() {
    alert("test function");
  }

  setupDevButtonListeners() {
    btnDev1.addEventListener("click", () => {
      alert("testFunctionWorks!");
    });

    btnDev2.addEventListener("click", () => {
      this.tempMessage("Gets list of all the polygons on the board, look at the console.");
      GetInfoOfAllPolygonsOnBoard();
    });

    btnDev3.addEventListener("click", () => {
      this.tempMessage("Gets the Current Mode, look at the console.");
      GetCurrentMode(true);
    });

    btnDev4.addEventListener("click", () => {
      this.tempMessage("Find All Local Saves");
      FindAllLocalStorage();
    });

    btnDev5.addEventListener("click", () => {
      // this.showBoardSize();

      let num = GetRandomInt();
      console.log(num);
    });
    // btnDev6.addEventListener("click", () => {
    //   PickRandomColor();
    // });
  }

  tempMessage(message) {
    alert(message);
    console.log(message);
  }

  // showBoardSize() {
  //   console.log(`The current board size is X:${boardSizeX} and Y:${boardSizeY}`);
  //   boardSizeX++;
  // }

  // Functions to do when loading file.
  onload() {
    console.log("dev class functions loaded");
  }
}

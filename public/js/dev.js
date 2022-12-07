import { GetCurrentMode } from "./helpers.js";
import { GetInfoOfAllPolygonsOnBoard } from "./actions.js";
import { FindAllLocalStorage } from "./savers.js";

export default class Developer {
  constructor() {
    this.onload();
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
  }

  tempMessage(message) {
    alert(message);
    console.log(message);
  }

  onload() {
    console.log("dev class functions loaded");
  }
}

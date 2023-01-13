import { GetInfoOfAllPolygonsOnBoard, RedrawBoard } from "./actions.js";
import Data from "./Data";

// Finds all the local storage on that machine.
export function FindAllLocalStorage() {
  const items = { ...localStorage };
  let list = [];

  for (const key in items) {
    if (key.includes("CB -")) list.push(key);
  }

  if (Data.savesOutput) {
    console.log("-----CurrentSAVES----------");
    console.log(list);
    console.log("----------------------");
  }

  return list;
}

// Finds all the current saves in local Storage then updates the sidebar on the left.
export function FindAllSavesAndUpdateList() {
  let list = FindAllLocalStorage();
  UpdateSaveList(list);
}

// Updates the list on the left with inputted save files.
export function UpdateSaveList(list) {
  let leftBar = document.querySelector(".leftBar");
  let savesList = document.querySelector(".savesList");

  if (savesList) {
    savesList.remove();
  } else {
    let h2 = document.createElement("h2");
    h2.textContent = "Current Save Files";
    leftBar.appendChild(h2);
  }

  let ul = document.createElement("ul");
  ul.className = "savesList";

  list.forEach((element) => {
    let li = document.createElement("li");

    li.textContent = element.slice(5);
    li.className = "savedDrawing";
    li.addEventListener("click", LoadFileFromSidebar);

    // button.addEventListener("click", DeleteFileFromSidebar);
    // li.appendChild(button);

    ul.appendChild(li);

    Data.savesOutput && console.log(element);
  });

  leftBar.appendChild(ul);
  Data.savesOutput && console.log("Saves list on the left updated!");
}

// Loads a file from the saves bar when clicked on.
function LoadFileFromSidebar(e) {
  let fileName = "CB - " + e.target.innerText;

  let answer = confirm(`Would you like to load ${e.target.innerText}`);
  if (!answer) {
    alert("ok We'll pass on that for now");
    return;
  }

  let log = [];
  log = JSON.parse(localStorage.getItem(fileName));

  console.log(`${fileName} is being loaded`);
  console.log(`This is the data included - ${log} `);

  RedrawBoard(log);
}

// See if it is in the list first. If not, let user know. else remove.
export function DeleteSaveFile() {
  let answer;
  answer = prompt("Which file do you want to delete?");

  let list = FindAllLocalStorage();
  if (!list.includes("CB - " + answer)) {
    alert("i dont see that one, try again.");
    return;
  }

  localStorage.removeItem("CB - " + answer);

  FindAllSavesAndUpdateList();
}

// Gets the info of all the items on the board, then saves it to local storage.
export function SaveWork() {
  let log = GetInfoOfAllPolygonsOnBoard();
  let saveName;

  do {
    saveName = prompt("What do you want the save to be called?");
  } while (saveName.trim(" ").length === 0);

  let list = FindAllLocalStorage();

  if (list.includes("CB - " + saveName)) {
    let overwrite = confirm("Are you sure you want to overwrite that file?");
    if (!overwrite) {
      alert(`Ok, we won't not overwrite ${saveName} atm.`);
      return;
    }
  }

  localStorage.setItem("CB - " + saveName, JSON.stringify(log));
  alert(`file saved as ${saveName}, i think.`);

  FindAllSavesAndUpdateList();
}

// Exports a string with all the polygons on the board,
// Need to refactor to shorten string length for certain items.
export function CreateExportString() {
  let log = GetInfoOfAllPolygonsOnBoard();
  let exportString = "";

  log.forEach((element) => {
    exportString += element.type + "-";
    exportString += element.class + "-";
    exportString += element.fill + "-";
    exportString += element.id + "-";
    exportString += element.locked + "-";
    exportString += element.selectable + "-";
    if (element.type === "polygon") exportString += element.points + "-";
    if (element.type === "circle") {
      exportString += element.r + "-";
      exportString += element.cx + "-";
      exportString += element.cy + "-";
    }
    exportString += "@";
  });

  console.log(log);
  console.log(exportString);
  alert(exportString);
}

// Imports a string and redraws the board with the info.
export function ImportString() {
  let entry = prompt("What is the string you would like to import");
  let string = entry.split("@");
  string.pop(); // Gets rid of a blank spot at the end.

  let info = [];

  let length = string.length - 1; // Removes length because one is background.

  console.log(`Length - ${length}`);

  string.forEach((element) => {
    let entry = {};

    let item = element.split("-");
    item.pop();
    entry.type = item[0];
    entry.class = item[1];
    entry.fill = item[2];
    entry.id = item[3];
    entry.locked = item[4];
    entry.selectable = item[5];
    if (entry.type === "polygon") entry.points = item[6];
    if (entry.type === "circle") {
      entry.r = item[6];
      entry.cx = item[7];
      entry.cy = item[8];
    }

    info.push(entry);
  });

  console.log(info);

  RedrawBoard(info);

  Data.alerts && alert(`${length} items were imported!`);

  // Couple of example strings
  // polygon-zone-#013101-svgBackground-true-false-0,0 0,600 900,600 900,0-@polygon-zone -#5630c0-87qLlC7V4o5FM583heOL8wA3-false-true-848,324 688,33 756,569-@polygon-zone -#5c685f-lD37KR8ZT9W73YWawg7JH071-false-true-570,229 449,414 367,561-@polygon-zone -#30c054-sp9sCfQgUBo1V7MD4xGk2xa0-false-true-762,513 558,468 536,107-@polygon-zone -#5c685f-ZK2lgVn560r7msKLw5d06Lw9-false-true-284,594 830,339 793,565-@polygon-zone -#c03030-2zfCE4Kn6QkL4LZ86MpSkGlX-false-true-372,129 322,229 422,229-@polygon-zone -#c03030-85x2I0mdF7HWwszm2KyH30O8-false-true-547,152 497,252 597,252-@polygon-zone -#c03030-puAIGIoP1lkc7UcGx4prv2n5-false-true-154,189 104,289 204,289-@polygon-zone -#c03030-zxa28lgTMiRGHtN62hnPgv7u-false-true-126,47 76,147 176,147-@polygon-zone -#c03030-0X7QaU3D4zZM8G4XQFR19qID-false-true-565,349 515,449 615,449-@
  // polygon-zone-#013101-svgBackground-true-false-0,0 0,600 900,600 900,0-@circle-zone -#1952c2-dv7FFV9BHfa0mN988auTujVd-false-true-9-195-536-@circle-zone -#c21919-7h4s2mo2znoo9E5jDDbfJwOC-false-true-46-536-316-@circle-zone -#c21919-YFIzODVoVkSxLUb5oYYIuRMv-false-true-13-303-248-@circle-zone -#1952c2-7t39EP1f5QOgAMGWXh6tVFEE-false-true-49-220-200-@circle-zone -#c21919-e9N9GjCrqKgQgYiw7cCvSZiZ-false-true-22-429-177-@circle-zone -#1952c2-uPo5bK6UBstvN9IHd7AEEAbE-false-true-35-364-92-@circle-zone -#1952c2-a56TXrN6UuNnT5D7i2q7VspR-false-true-18-570-259-@circle-zone -#c21919-mX1o7JZgJGLk2zBT7nfbRePD-false-true-9-354-276-@circle-zone -#c21919-wlh7ZhhIptu1Tc2yYYxIHiKz-false-true-21-402-404-@
}

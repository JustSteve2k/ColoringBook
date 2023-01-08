import { GetInfoOfAllPolygonsOnBoard, RedrawBoard } from "./actions.js";

// Finds all the local storage on that machine.
export function FindAllLocalStorage() {
  const items = { ...localStorage };
  let list = [];
  console.log("-----CurrentSAVES----------");

  for (const key in items) {
    if (key.includes("CB -")) list.push(key);
  }
  console.log(list);
  console.log("----------------------");

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

    console.log(element);
  });

  leftBar.appendChild(ul);
  console.log("Saves list on the left updated!");
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
export function CreateExportString(){
  let log = GetInfoOfAllPolygonsOnBoard();
  let exportString = "";

  exportString += log.length;

  log.forEach(element => {
      exportString += element.class;
      exportString += element.fill;
      exportString += element.id;
      exportString += element.locked;
      exportString += element.points;
      exportString += element.selectable;
      exportString += element.type;
      exportString += ",";
  });

  console.log(log);
  console.log(exportString);
}

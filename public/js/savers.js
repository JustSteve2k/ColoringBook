import { RedrawBoard } from "./actions.js";

export function FindAllLocalStorage() {
  const items = { ...localStorage };
  let list = [];
  console.log("-----CurrentSAVES----------");

  for (const key in items) {
    if (key.includes("CB -")) list.push(key);
  }
  console.log(list);
  console.log("----------------------");

  UpdateSaveList(list);

  return list;
}

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

function LoadFileFromSidebar(e) {
  let fileName = "CB - " + e.target.innerText;

  // alert(`you clicked on ${e.target.innerText}`);
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

export function DeleteSaveFile() {
  let answer;
  answer = prompt("Which file do you want to delete?");

  localStorage.removeItem("CB - " + answer);

  FindAllLocalStorage();
}

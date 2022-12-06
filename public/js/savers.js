export function SaveTest() {
  do {
    let fileName = prompt("What would you like to save your file as?");
  } while (fileName.trim().length === 0);

  localStorage.setItem("CB - " + fileName, fileName + " - testValue");
}

export function FindAllLocalStorage() {
  const items = { ...localStorage };
  let list = [];
  console.log("-----CurrentSAVES----------");

  for (const key in items) {
    if (key.includes("CB -")) list.push(key);
  }
  console.log(list);
  console.log("----------------------");
  //   console.log(Object.keys(localStorage));

  //   for (let x = 0; x < localStorage.length; x++) {
  //     console.log(localStorage.getItem(localStorage.key(x)));
  //   }

  UpdateSaveList(list);

  return list;
}

function UpdateSaveList(list) {
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
    ul.appendChild(li);
    console.log(element);
  });

  leftBar.appendChild(ul);
  console.log("Saves list on the left updated!");
}

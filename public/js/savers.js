export function SaveTest() {
  let fileName = prompt("What would you like to save your file as?");

  localStorage.setItem("CB - " + fileName, fileName + " - testValue");
}

export function FindAllLocalStorage() {
  const items = { ...localStorage };
  console.log("-----CurrentSAVES----------");

  for (const key in items) {
    if (key.includes("CB -")) console.log(key);
    // console.log(items[key]);
  }
  console.log("----------------------");
  //   console.log(Object.keys(localStorage));

  //   for (let x = 0; x < localStorage.length; x++) {
  //     console.log(localStorage.getItem(localStorage.key(x)));
  //   }
}

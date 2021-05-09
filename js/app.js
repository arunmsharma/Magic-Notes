console.log("Welcome to Notes App");
showNotes();

//if user adds a note add it to local storage
let addBtn = document.getElementById("addBtn");
addBtn.addEventListener("click", function (e) {
  let addTxt = document.getElementById("addTxt");
  let addTitle = document.getElementById("addTitle");
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  let myObj = {
    title: addTitle.value,
    text: addTxt.value
  };
  notesObj.push(myObj);
  localStorage.setItem("notes", JSON.stringify(notesObj));

  addTxt.value = "";
  addTitle.value = "";

  // console.log(notesObj);

  showNotes();
});
//function to show elements from local storage
function showNotes() {
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  let html = "";
  notesObj.forEach(function (element, index) {
    html += ` 
    <div class="noteCard my-2 mx-2 card" style="width: 18rem">
    <div class="card-body">
      <h5 class="card-title">${element.title}</h5>
      <p class="card-text"> ${element.text}
      </p>
      <button id = "${index}" onclick="deleteNote(this.id)" class="btn btn-primary">Delete Note</button>
    </div>
  </div>
    `;
  });

  let notesElm = document.getElementById("notes");
  if (notesObj.length != 0) {
    notesElm.innerHTML = html;
  } else {
    notesElm.innerHTML = `<b>No new notes!</b>`;
  }
}
//functions to delete note
function deleteNote(index) {
  // console.log("I am deleting this note number ", index + 1);
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }

  notesObj.splice(index, 1); //wow!!
  localStorage.setItem("notes", JSON.stringify(notesObj));

  showNotes();
}

let search = document.getElementById("searchTxt");

search.addEventListener("input", function () {
  let inputval = search.value.toLowerCase();
  // console.log("Input event fired", inputval);

  let noteCards = document.getElementsByClassName("noteCard");
  Array.from(noteCards).forEach(function (ele) {
    let cardTxt = ele.getElementsByTagName("p")[0].innerText;
    if (cardTxt.includes(inputval)) {
      ele.style.display = "block";
    } else {
      ele.style.display = "none";
    }
  });
});
// // Further Features
// 1. Add title.
// 2. Mark a note as important
// 3. Seperate notes by user 
// 4. Sync and host by web server 
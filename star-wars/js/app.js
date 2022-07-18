import getJSON from "./model/utils.js";
import favoriteList from "./views/favoriteList.js";
import { deleteLS, readFromLS, writeToLS } from "./model/ls.js";

//Selectors
const peopleDiv = document.getElementById("people-div");
const faveDiv = document.getElementById("fave-div");
const searchBar = document.getElementById("search-bar");
const alertMsg = document.getElementById("alert");
const parentNext = document.getElementById("next");
const parentPrev = document.getElementById("prev");
const parentList = document.getElementsByClassName("parent-list")[0];
const viewBtn = document.getElementById("view-btn");
const moreInfo = document.getElementById("more-info");
const moreInfoBtn= document.getElementById("showMoreBtn");
const draggable = document.querySelector(".dragging");
const ulFave = document.querySelector(".fave-ul");


//Event Listeners
document.addEventListener("DOMContentLoaded", displayItems);
searchBar.addEventListener("keyup", searchPerson);
parentList.addEventListener("click", addToFave);
viewBtn.addEventListener("click", openNav);

//Model code
function getPeople(url) {
  console.log("Loading Star Wars characters...");
  return getJSON(url);
}

//View code
function renderPeopleList(people) {
  const peopleLi = people
    .map((person) => {
      return `<li class="person"><span class="person-name">${person.name}</span> <i class="fa-solid fa-plus add delete"></i></li>`;
    })
    .join("");
  parentList.innerHTML = peopleLi;
  // displayFave(details);
}

//Loader
document.onreadystatechange = function () {
  if (document.readyState !== "complete") {
    document.querySelector("body").style.visibility = "hidden";
    document.querySelector("#loader").style.visibility = "visible";
  } else {
    document.querySelector("#loader").style.display = "none";
    document.querySelector("body").style.visibility = "visible";
  }
};

//Search code
let peopleList = [];
function searchPerson(e) {
  alertMsg.innerText = "";
  const searchString = e.target.value.toLowerCase();
  if (searchString != 0) {
    const filteredCharacters = peopleList.filter((character) => {
      return character.name.toLowerCase().includes(searchString);
    });
    renderPeopleList(filteredCharacters);
  } else {
    alertMsg.innerText = "Enter a valid name.";
  }
}

//Show next/prev buttons
function nextBtn(results) {
  if (results.next) {
    const next = document.createElement("button");
    next.innerHTML = `Next <i class="fa-solid fa-angles-right"></i>`;
    next.classList.add("next");
    let timeOuttoken = 0;
    next.addEventListener("click", (event) => {
      clearTimeout(timeOuttoken);
      timeOuttoken = setTimeout(() => {
        showPeople(results.next);
      }, 800);
    });
    parentNext.appendChild(next);
    if (next.previousSibling) parentNext.removeChild(next.previousSibling);
  } else if (results.next == null) {
    next.innerText = "";
  }
}

function prevBtn(results) {
  if (results.previous) {
    const prev = document.createElement("button");
    prev.innerHTML = `<i class="fa-solid fa-angles-left"></i> Previous`;
    prev.classList.add("prev");
    let timeOuttoken = 0;
    prev.addEventListener("click", (event) => {
      clearTimeout(timeOuttoken);
      timeOuttoken = setTimeout(() => {
        showPeople(results.previous);
      }, 800);
    });
    parentPrev.appendChild(prev);
    if (prev.previousSibling) parentPrev.removeChild(prev.previousSibling);
  } else if (results.previous == null) {
    prev.innerText = "";
  }
}

//Adding/Display favorite characters
function addToFave(e) {
  const fave = e.target;
  if (fave.classList[0] === "person") {
    const getInfo = peopleList.find((item) => item.name === fave.innerText);

    faveDiv.insertAdjacentHTML("beforeend", favoriteList(getInfo));

    //localstorage
    writeToLS(getInfo.name, getInfo);
    saveToLocal(getInfo.name, getInfo);

    //upload and delete
    const trashID = getInfo.name.split(" ").join("") + `-trash`;
    const trashIcon = document.querySelector("." + trashID);
    trashIcon.onclick = removeFave;

    const uploadID = getInfo.name.split(" ").join("") + `-upload`;
    const fileInput = document.querySelector("." + uploadID);
    fileInput.onchange = preview;

    //main array
    fave.style.display = "none";

    //drag and drop
    const liFave = document.querySelectorAll(".li-fave");
    liFave.forEach((element) => {
      ondragstart = dragStart;
      ondragend = dragEnd;
    });

    const ulFave = document.querySelectorAll(".fave-ul");
    ulFave.forEach((ulFave) => {
      ondragover = dragOver;
    });

    //show more info
    const moreInfoBtn= document.querySelectorAll("#showMoreBtn");
    moreInfoBtn.forEach((element) => {
      onclick = showMoreFaveInfo;
    })
  }

  
}



//Save to localstorage
function saveToLocal(faveName, faveInfo) {
  let favePeople;
  if (localStorage.getItem("faveName") === null) {
    favePeople = [];
  } else {
    favePeople = readFromLS(faveName);
  }
  favePeople.push(faveName);
  writeToLS(faveName, faveInfo);
}

//Display from localstorage
function displayItems(faveName) {
  console.log("loading faves");
  let favePeople;
  if (localStorage.getItem("faveName") === null) {
    favePeople = [];
   
  } else {
    favePeople = readFromLS(faveName);
    console.log(
      "🚀 ~ file: app.js ~ line 153 ~ displayItems ~ favePeople",
      favePeople
    );
  }
  // favePeople.forEach(function (faveName) {
  //   faveDiv.innerHTML += `favoriteList(getInfo)`;
  // });
}

//Adding image for favorite characters
let uploadedImage = "";
function preview(e) {
  const fave = e.target;  
  const favePic = document.getElementsByClassName("fave-pic")[0];  
  const reader = new FileReader();  
  reader.onload = () => {
    uploadedImage = reader.result;
    favePic.style.backgroundImage = `url(${uploadedImage})`;
  };
  reader.readAsDataURL(this.files[0]);
  console.log("🚀 ~ file: app.js ~ line 216 ~ preview ~ this.files[0]", this.files[0])
}

//Removing favorite characters
function removeFave(e) {
  const fave = e.target;
  const trashItem = fave.parentElement;
  const favoriteItem = trashItem.parentElement.remove();
}

//Show more info - fave list
function showMoreFaveInfo(e) {
  const fave = e.target;
  const divMoreInfo = document.querySelector(".div-fave2");
    divMoreInfo.classList.toggle("more-info");    
   }

//Dragstart
function dragStart(e) {
  console.log("start");
  e.target.classList.add("dragging");
}

//Dragend
function dragEnd(e) {
  console.log("end");
  e.target.classList.remove("dragging");
}

//Dragover for ul container
function dragOver(e) {
  e.preventDefault();
  
  const draggable = document.querySelector(".dragging");
  const ulFave = document.querySelector(".fave-ul");
  const afterElement = getDragAFterElement(ulFave, e.clientY);  

  if (afterElement == null) {
    ulFave.appendChild(draggable);
    console.log("drag over")
  } else {
    ulFave.insertBefore(draggable, afterElement);
  }
}

//Drag after element
function getDragAFterElement(ulFave, y) {
  console.log("drag after")
  const draggable = document.querySelector(".dragging");
  const draggableElements = [...ulFave.querySelectorAll(".draggable:not(.dragging)")];
 return draggableElements.reduce((closest, child) => {
const box = child.getBoundingClientRect();
const offset = y - box.top - box.height / 2;
if (offset < 0 && offset > closest.offset) {
  return { offset: offset, element: child } 
}  else {
    return closest;  
} 
}, {offset: Number.NEGATIVE_INFINITY}).element;
}


//Side panel
const x = window.matchMedia("(min-width: 768px)");

function openNav() {
  if (x.matches) {
    if (faveDiv.style.display === "none" || faveDiv.style.display === "") {
      faveDiv.style.display = "block";
      faveDiv.style.width = "500px";
      document.body.style.marginRight = "500px";
      viewBtn.innerHTML = `<i class="fa-solid fa-eye-slash view"></i> Close List`;
    } else {
      faveDiv.style.display = "none";
      document.body.style.marginRight = "0";
      viewBtn.innerHTML = `<i class="fa-solid fa-eye view"></i> View List`;
    }
  } else {
    faveDiv.style.width = "100%";
    document.body.style.marginRight = "0";
  }
}

// closeBtn.addEventListener("click", closeNav);
function closeNav() {
  faveDiv.style.width = "0";
  document.body.style.marginRight = "0";
  viewBtn.innerHTML = `<i class="fa-solid fa-eye view"></i> View List`;
}

// controller code
async function showPeople(url = "https://swapi.dev/api/people/") {
  const results = await getPeople(url);

  //get the list element
  peopleList.push(...results.results);
  renderPeopleList(results.results, peopleDiv);

  //next button
  nextBtn(results);

  //previous button
  prevBtn(results);
}

showPeople();

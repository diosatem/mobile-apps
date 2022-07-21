import getJSON from "./model/utils.js";
import favoriteList from "./views/favoriteList.js";
import { readFromLS, writeToLS } from "./model/ls.js";
import showCharacters from "./views/character.js";
import { handleUpload, removeFavorite } from "./controllers/favorite.js";

//Selectors
const peopleDiv = document.getElementById("people-div");
const faveDiv = document.getElementById("fave-div");
const searchBar = document.getElementById("search-bar");
const alertMsg = document.getElementById("alert");
const parentNext = document.getElementById("next");
const parentPrev = document.getElementById("prev");
const parentList = document.getElementsByClassName("parent-list")[0];
const viewBtn = document.getElementById("view-btn");
const closeBtn = document.getElementById("close-btn");
const favoriteUL = document.querySelector("#fave-ul");

//Event Listeners
document.addEventListener("DOMContentLoaded", displayItems);
searchBar.addEventListener("keyup", searchPerson);
parentList.addEventListener("click", addToFave);
viewBtn.addEventListener("click", openNav);
closeBtn.onclick = closeNav;
favoriteUL.addEventListener("click", removeFavorite);

//Model code
function getPeople(url) {
  console.log("Loading Star Wars characters...");
  return getJSON(url);
}

//View code
export function renderPeopleList(people) {
  const peopleLi = people
    .map((person, index) => showCharacters(person, index))
    .join("");
  parentList.innerHTML = peopleLi;
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
let favoriteCharacters = [];
function addToFave(e) {
  const fave = e.target;
  if (fave.classList[0] === "person") {
    let getIndex = peopleList.findIndex((item) => item.name === fave.innerText);
    let addCharacter = peopleList[getIndex];
    addCharacter.id = getIndex;

    const ulFave = document.querySelector("#fave-ul");
    ulFave.innerHTML += favoriteList(addCharacter);

    //localstorage
    writeToLS(addCharacter.name, addCharacter); //utils
    saveToLocal(addCharacter.name, addCharacter); //app

    fave.style.display = "none";

    //upload
    ulFave.onchange = handleUpload;

    //drag and drop
    const draggables = document.querySelectorAll(".li-fave");
    const containers = document.querySelectorAll("#fave-ul");
    draggables.forEach((draggable) => {
      ondragstart = dragStart;
      ondragend = dragEnd;
    });

    containers.forEach((container) => {
      container.addEventListener("dragover", (e) => {
        e.preventDefault();
        const afterElement = getDragAFterElement(container, e.clientY);
        const draggable = document.querySelector(".dragging");
        if (afterElement == null) {
          container.appendChild(draggable);
        } else {
          container.insertBefore(draggable, afterElement);
        }
      });
    });

    favoriteCharacters.push(addCharacter);
    return;
  }
}

//Save to localstorage
let favePeople;
function saveToLocal(faveName, faveInfo) {  
  if (localStorage.getItem("faveName") === null) {
    favePeople = [];
  } else {
    favePeople = readFromLS(faveName);
  }
  favePeople.push(faveName); 
    writeToLS(faveName, faveInfo);
}

//Display from localstorage
function displayItems(key) {
  console.log("Loading favorite characters...");

  const getLocal = localStorage;
  console.log(typeof getLocal);

  const ulFave = document.querySelector("#fave-ul");
  ulFave.innerHTML += getLocal;

  let favePeople;
  if (localStorage.getItem("favoriteCharacters") === null) {
    favePeople = [];
    console.log("if");
  } else {
    favePeople = JSON.parse(localStorage.getItem(favoriteCharacters));
    console.log("else");
  }
  favePeople.forEach(function (faveName) {
    ulFave.innerHTML += `favePeople`;
  });
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

//Drag after element
function getDragAFterElement(ulFaveItem, y) {
  console.log("drag after");
  const draggable = document.querySelector(".dragging");
  const draggableElements = [
    ...ulFaveItem.querySelectorAll(".draggable:not(.dragging)"),
  ];

  return draggableElements.reduce(
    (closest, child) => {
      const box = child.getBoundingClientRect();
      const offset = y - box.top - box.height / 2;
      if (offset < 0 && offset > closest.offset) {
        return { offset: offset, element: child };
      } else {
        return closest;
      }
    },
    { offset: Number.NEGATIVE_INFINITY }
  ).element;
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

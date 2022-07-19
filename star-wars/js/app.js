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
const moreInfoBtn = document.getElementById("showMoreBtn");
const draggable = document.querySelectorAll(".dragging");
const ulFave = document.querySelectorAll(".fave-ul");
const closeBtn = document.getElementById("close-btn");

//Event Listeners
document.addEventListener("DOMContentLoaded", displayItems);
searchBar.addEventListener("keyup", searchPerson);
parentList.addEventListener("click", addToFave);
viewBtn.addEventListener("click", openNav);
closeBtn.onclick = closeNav;

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
async function addToFave(e) {
  e.preventDefault();
  const fave = e.target;
  if (fave.classList[0] === "person") {
    const getInfo = peopleList.find((item) => item.name === fave.innerText);

    const ulFave = document.querySelector("#fave-ul");
    ulFave.insertAdjacentHTML("beforeend", favoriteList(getInfo));

    //localstorage
    writeToLS(getInfo.name, getInfo);
    saveToLocal(getInfo.name, getInfo);
    const faveKey = readFromLS(getInfo.name);
    displayItems(getInfo.name);
    console.log("🚀 ~ file: app.js ~ line 124 ~ addToFave ~ displayItems(getInfo.name)", displayItems(getInfo.name))
    
    
    

    //upload and delete
    const trashID = getInfo.name.split(" ").join("") + `-trash`;
    const trashIcon = document.querySelector("." + trashID);
    trashIcon.onclick = removeFave;
    // trashIcon.addEventListener(onclick, removeFave);

    const uploadID = getInfo.name.split(" ").join("") + `-upload`;
    const fileInput = document.querySelector("." + uploadID);
    fileInput.onchange = preview;

    //main array
    // fave.style.display = "none";
    fave.remove();

    //drag and drop
     const draggables = document.querySelectorAll(".li-fave");
    const containers = document.querySelectorAll("#fave-ul");
    draggables.forEach(draggable => {
      ondragstart = dragStart;
      ondragend = dragEnd;
    });

    containers.forEach(container => {
      container.addEventListener("dragover", e => {
        e.preventDefault();
        const afterElement = getDragAFterElement(container, e.clientY);

        const draggable = document.querySelector(".dragging");
        container.appendChild(draggable);
      })
    })

  

    // show more info
    const moreInfoBtn = document.querySelectorAll("#showMoreBtn");
    moreInfoBtn.forEach((element) => {
      onclick = showMoreFaveInfo;
    });
  }
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
function getDragAFterElement(container, y) {
  console.log("drag after");
  const draggableElements = [
    ...container.querySelectorAll(".draggable:not(.dragging)")];
  const draggable = document.querySelector(".dragging");
  
  return draggableElements.reduce(
    (closest, child) => {
      const box = child.getBoundingClientRect();
      const offset = y - box.top - box.height / 2;
      console.log("🚀 ~ file: app.js ~ line 194 ~ getDragAFterElement ~ offset", offset)
      if (offset < 0 && offset > closest.offset) {
        return { offset: offset, element: child };
      } else {
        return closest;
      }
    },
    { offset: Number.NEGATIVE_INFINITY }
  ).element;
}

//Save to localstorage
function saveToLocal(faveName, faveInfo) {
  //check if there's an existing data in ls. if there is, don't rewrite.
  let favePeople;
  if (localStorage.getItem("faveName") === null) {
    //if it doesn't exist, create an empty array
    favePeople = [];
  } else {
    favePeople = readFromLS(faveName); //if it does exist, parse it back into an array
  }
  favePeople.push(faveName);
  writeToLS(faveName, faveInfo);
}

//Display from localstorage
function displayItems(faveName) {
  console.log("🚀 ~ file: app.js ~ line 177 ~ displayItems ~ faveName", faveName)
  console.log("loading faves");

  let favePeople;
  if (localStorage.getItem("key") === null) {
    favePeople = [];
    console.log("array")
  } else {
    favePeople = JSON.parse(localStorage.getItem(faveName));
    
  }

  favePeople.forEach(function (key) {
    ulFave.innerHTML += favePeople;
  });
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
  console.log(
    "🚀 ~ file: app.js ~ line 216 ~ preview ~ this.files[0]",
    this.files[0]
  );
}

//Removing favorite characters
function removeFave(e) {
  const fave = e.target;
  const trashItem = fave.parentElement;
  const favoriteItem = trashItem.parentElement;
  favoriteItem.remove();
  console.log("removed");
}

//Show more info - fave list
function showMoreFaveInfo(e) {
  const fave = e.target;
  const jediIcon = document.getElementsByClassName("jedi-icon")[0];
  const divTwo = document.getElementsByClassName("div-fave2")[0];
  const infoBtn = document.getElementById("showMoreBtn");

  if (jediIcon.style.display === "none") {
    jediIcon.style.display = "inline";
    infoBtn.innerHTML = "Show more";
    divTwo.style.display = "none";
  } else {
    jediIcon.style.display = "none";
    infoBtn.innerHTML = "Show less";
    divTwo.style.display = "inline";
  }
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

import { getJSON, readFromLS } from "./utils.js";

//Selectors
const peopleDiv = document.getElementById("people-div");
const faveDiv = document.getElementById("fave-div");
const searchBar = document.getElementById("search-bar");
const parentNext = document.getElementById("next");
const parentPrev = document.getElementById("prev");
const peopleLi = document.querySelector("li.person");
const parentList = document.getElementsByClassName("parent-list")[0];
const viewBtn = document.getElementById("view-btn");
const closeBtn = document.getElementById("close-btn");
let peopleList = [];

//Event Listeners
searchBar.addEventListener("keyup", searchPerson);
parentList.addEventListener("click", addToFave);
viewBtn.addEventListener("click", openNav);
closeBtn.addEventListener("click", closeNav);

//Model code
function getPeople(url) {
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
}

//Search code
function searchPerson(e) {
  const searchString = e.target.value.toLowerCase();
  // console.log(searchString);
  // if (searchString != "") {
  const filteredCharacters = peopleList.filter((character) => {
    return character.name.toLowerCase().includes(searchString);
  });
  // console.log(peopleList);
  renderPeopleList(filteredCharacters);
  // } else {
  // peopleDiv.innerText = "Please enter a valid name."
  // }
}

//Show buttons
function nextBtn(results) {
  if (results.next) {
    const next = document.createElement("button");
    next.innerText = "Next";
    next.classList.add("next");
    let timeOuttoken = 0;
    next.addEventListener("click", (event) => {
      clearTimeout(timeOuttoken);
      timeOuttoken = setTimeout(() => {
        showPeople(results.next);
        console.log(results.next);
      }, 800);
    });
    parentNext.appendChild(next);
    parentNext.removeChild(next.previousSibling);
     } else if (results.next == null) {
    console.log("end of list");
    next.innerText = "";
  }
}

function prevBtn(results) {
  if (results.previous) {
    const prev = document.createElement("button");
    prev.innerText = "Previous";
    prev.classList.add("prev");
    let timeOuttoken = 0;
    prev.addEventListener("click", (event) => {
      clearTimeout(timeOuttoken);
      timeOuttoken = setTimeout(() => {
        showPeople(results.previous);
        // console.log(results.previous);
      }, 800);     
    });
    parentPrev.appendChild(prev);
    parentPrev.removeChild(prev.previousSibling);
     } else if (results.previous == null) {
    prev.innerText = "";
  }
}

let favePeople = [];
function addToFave(e) {
  const fave = e.target;
  if (fave.classList[0] === "person") {
    favePeople.push(fave);
    console.log("🚀 ~ file: app.js ~ line 95 ~ addToFave ~ fave", fave)
    //  alert(favePeople[0].innerText);
    
    displayFave(fave);
  }
}

function displayFave(fave) {
  // faveDiv.innerHTML = "";
  favePeople.forEach((fave) => {
    faveDiv.innerHTML += `<li class="fave"><span class="fave-name">${fave[0]}</span> <i class="fa-solid fa-minus delete"></i></li>`;
    console.log(
      "🚀 ~ file: app.js ~ line 110 ~ displayFave ~ fave[0]",
      fave[0]
    );
  });
  console.log(
    "🚀 ~ file: app.js ~ line 110 ~ displayFave ~ favePeople",
    favePeople
  );
}

// function saveToLocal(faveChar) {
//   let faves;
//   faveDiv.innerHTML = "";
  // if (localStorage.getItem("faves") === null) {
  //     favePeople = [];
  // } else {
  //     items = JSON.parse(localStorage.getItem("items"));
  // }

//   favePeople.push(faveChar);
//   localStorage.setItem("faves", JSON.stringify(faveChar));
//   console.log(faves);
// }

// side panel
const x = window.matchMedia("(min-width: 426px)");

function openNav() {
  if (x.matches) {
    faveDiv.style.width = "400px";
    document.body.style.marginRight = "400px";
  } else {
    faveDiv.style.width = "250px";
    document.body.style.marginRight = "0";
  }
}

function closeNav() {
  faveDiv.style.width = "0";
  document.body.style.marginRight = "0";
}

// controller code
async function showPeople(url = "https://swapi.dev/api/people/") {
  const results = await getPeople(url);
  // console.log(results);

  //get the list element
  peopleList.push(...results.results);
  renderPeopleList(results.results, peopleDiv);

  //next button
  nextBtn(results);

  //previous button
  prevBtn(results);
}

async function getPersonDetails(url) {
  //call getJSON functions for the provided url
  const person = await getPeople(url);
  renderPersonDetails(people);
  //with the results populate the elements in the #detailsbox
}

showPeople();

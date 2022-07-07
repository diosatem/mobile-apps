import { getJSON, readFromLS } from "./utils.js";

//Selectors
const peopleDiv = document.getElementById("people-div");
const faveDiv = document.getElementById("fave-div");
const searchBar = document.getElementById("search-bar");
const alertMsg = document.getElementById("alert");
const parentNext = document.getElementById("next");
const parentPrev = document.getElementById("prev");
const peopleLi = document.querySelector("li.person");
const parentList = document.getElementsByClassName("parent-list")[0];
const viewBtn = document.getElementById("view-btn");
const closeBtn = document.getElementById("close-btn");

//Event Listeners
searchBar.addEventListener("keyup", searchPerson);
parentList.addEventListener("click", addToFave);
viewBtn.addEventListener("click", openNav);
closeBtn.addEventListener("click", closeNav);
// document.getElementsByClassName("fa-trash").addEventListener("click", removeFave, false);

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
  console.log(people[0].birth_year);
  console.log(people[0].height);
  console.log(people[0].gender);
  console.log(people[0].hair_color);
  console.log(people[0].skin_color);
  console.log(people[0].eye_color);
  // displayFave(details);
}

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

//Adding/Display favorite characters
let favePeople = [];
function addToFave(e) {
  const fave = e.target;
  if (fave.classList[0] === "person") {
    faveDiv.innerHTML += `<li class="li-fave"><div class="div-fave1"><span class="fave-name">${fave.innerText}</span></div><div class="div-fave2"><p>More info<p><p>Picture<p><p>Quote<p></div><div class="div-fave3"><i class="fa-solid fa-image"></i><i class="fa-solid fa-quote-left"></i><i class="fa-solid fa-trash" onclick="removeFave()"></i></div></li>`;
    favePeople.push(fave);
    fave.style.display = "none";
  }
}

//Removing favorite characters
function removeFave(e) {
  const fave = e.target;
  if (fave.classList[0] == "fa-trash") {
    console.log("deleted");
  }
  // favePeople.splice(index,1);
}

// side panel
const x = window.matchMedia("(min-width: 768px)");

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

  //fave list
  // displayFave(results.results);

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

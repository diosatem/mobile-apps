import { getJSON, readFromLS } from "./utils.js";

// export default class FaveCharacter {

//   }

//Selectors
const peopleDiv = document.getElementById("people-div");
const faveDiv = document.getElementById("fave-div");
faveDiv.innerHTML = `View list`;
const searchBar = document.getElementById("search-bar");
const parent = document.getElementById("go-to");
const peopleLi = document.querySelector("li.person");

let peopleList = [];

//Event Listeners
searchBar.addEventListener("keyup", searchPerson);
// peopleLi.addEventListener("click", addToLocal);


//Model code
function getPeople(url) {
  return getJSON(url);
  //   peopleList = getJSON(url);
  // console.log(peopleList);
  //     return peopleList;
}

//View code
function renderPeopleList(people, peopleDiv) {
  const parentList = document.createElement("ul");
  parentList.classList.add("parent-list");
  peopleDiv.appendChild(parentList);

  const peopleLi = people
    .map((person) => {
      return `<li class="person" onclick="addToLocal()"><span class="person-name">${person.name}</span> <i class="fa-solid fa-plus add delete"></i></li>`;
    })
    .join("");

  parentList.innerHTML = peopleLi;  
}

function addToLocal(e) {
const item = e.target;
console.log("Hello");
}

//Search code
function searchPerson(e) {
  const searchString = e.target.value.toLowerCase();
  console.log(searchString);

  if (searchString.trim().length === 0) {
    return;
  }
  const filteredCharacters = peopleList.filter((character) => {
    return character.name.toLowerCase().includes(searchString);
  });
  // renderPeopleList(filteredCharacters);
}

 //Show more button
function showMore(results) { 
  if (results.next) {
    const next = document.createElement("p");
    next.innerText = "Show more...";
    next.classList.add("next");
    let timeOuttoken = 0;
    next.addEventListener("click", (event) => {
      clearTimeout(timeOuttoken);
      timeOuttoken = setTimeout(() => {
        showPeople(results.next);
        console.log(results.next);
      }, 800);
    });

    parent.appendChild(next);
    parent.removeChild(next.previousSibling);
  } else if (results.next == null) {
    console.log("end of list");
  }
}

// controller code
async function showPeople(url = "https://swapi.dev/api/people/") {
  const results = await getPeople(url);
  console.log(results);

  //get the list element
  renderPeopleList(results.results, peopleDiv);

  //show more button
  showMore(results);
  
}

async function getPersonDetails(url) {
  //call getJSON functions for the provided url
  const person = await getPeople(url);
  renderPersonDetails(people);
  //with the results populate the elements in the #detailsbox
}
showPeople();

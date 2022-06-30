import { getJSON, readFromLS } from "./utils.js";

// export default class FaveCharacter {

//   }

//Selectors
const peopleDiv = document.getElementById("people-div");
const searchBar = document.getElementById("search-bar");
const parent = document.getElementById("go-to");
const showNext = document.getElementById("next");
const peopleLi = document.querySelector("li.person");
// console.log(peopleLi[1].value);
let filteredList = [];

//Event Listeners
searchBar.addEventListener("keyup", searchPerson);
// peopleLi.addEventListener("click", addToLocal);

//save to array
function addToFave(e) {
  return console.log("added", e);
}

// model code
function getPeople(url) {
  // const searchResults = fetchJson.map(element => element.name)
  return getJSON(url);
}

//  View code
function renderPeopleList(people, peopleDiv) {
  const parentList = document.createElement("ul");
  parentList.classList.add("parent-list");
  peopleDiv.appendChild(parentList);

  const peopleLi = people
    .map((person) => {
      return `<li class="person" onclick="addToFave();"><span class="person-name">${person.name}</span> <i class="fa-solid fa-plus add added"></i></li>`;
    })
    .join("");

  parentList.innerHTML = peopleLi;
}

//search bar
function searchPerson(e) {
  const searchString = e.target.value.toLowerCase();
  console.log(searchString);
  const filteredCharacters = filteredList.filter((character) => {
    return (
      character.name.toLowerCase().includes(searchString) ||
      character.house.toLowerCase().includes(searchString)
    );
  });
  showPeople(filteredCharacters);
}

// controller code
async function showPeople(url = "https://swapi.dev/api/people/", characters) {
  const results = await getPeople(url);

  //get the list element
  renderPeopleList(results.results, peopleDiv);

  //show more button
  if (results.next) {
    const next = document.createElement("p");
    next.innerText = "Show more...";
    next.classList.add("next");
    let timeOuttoken = 0;
    next.addEventListener("click", (event) => {
      clearTimeout(timeOuttoken);
      timeOuttoken = setTimeout(() => {
        showPeople(results.next);
      }, 800);
    });

    parent.appendChild(next);
    parent.removeChild(next.previousSibling);
  }

  addToFave();
}

async function getPersonDetails(url) {
  //call getJSON functions for the provided url
  const person = await getPeople(url);
  renderPersonDetails(people);
  //with the results populate the elements in the #detailsbox
}
showPeople();

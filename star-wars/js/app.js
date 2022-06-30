import { getJSON, readFromLS } from "./utils.js";

// export default class FaveCharacter {

//   }

//Selectors
const peopleDiv = document.getElementById("people-div");
const searchBar = document.getElementById("search-bar");
const parent = document.getElementById("go-to");
const showNext = document.getElementById("next");
let faveCharacters = [];

//Event Listeners
searchBar.addEventListener("keyup", searchPerson);

// model code
function getPeople(url) {
  return getJSON(url);
}

//  View code
function renderPeopleList(people, peopleDiv) {
  const parentList = document.createElement("ul");
  parentList.classList.add("parent-list");
  peopleDiv.appendChild(parentList);

  const peopleLi = people
    .map((person) => {
      return `<li class="person"><span class="person-name">${person.name}</span> <i class="fa-solid fa-plus add added"></i></li>`;
    })
    .join("");

  parentList.innerHTML = peopleLi;
}

//search bar
function searchPerson(e) {
  const searchString = e.target.value.toLowerCase();
  console.log(searchString);
  const filteredCharacters = faveCharacters.filter((character) => {
    return (
      character.name.toLowerCase().includes(searchString) ||
      character.house.toLowerCase().includes(searchString)
    );
  });
  renderPeopleList(filteredCharacters);
}

// controller code
async function showPeople(url = "https://swapi.dev/api/people/") {
  const results = await getPeople(url);
  console.log(results.next);

  //get the list element
  renderPeopleList(results.results, peopleDiv);

  //show more button
  if (results.next) {
    const next = document.createElement("p");
    next.innerText = "Show more...";
    next.classList.add("next");

    next.addEventListener("click", (event) => {
      showPeople(results.next);
    });

    parent.appendChild(next);
    parent.removeChild(next.previousSibling);
  }
}

async function getPersonDetails(url) {
  //call getJSON functions for the provided url
  const person = await getPeople(url);
  renderPersonDetails(people);
  //with the results populate the elements in the #detailsbox
}
showPeople();

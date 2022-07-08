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
const fileInput = document.getElementById("file-input");
const favePic = document.getElementsByClassName("fave-pic");

//Event Listeners
searchBar.addEventListener("keyup", searchPerson);
parentList.addEventListener("click", addToFave);
viewBtn.addEventListener("click", openNav);
// closeBtn.addEventListener("click", closeNav);
// document.getElementsByClassName("fa-trash").addEventListener("click", removeFave, false);
// favePic.addEventListener("onchange", preview);

//Model code
function getPeople(url) {
  console.log("Loading people...");

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
    const getInfo = peopleList.find((item) => {
      return item.name === fave.innerText;
    });
    // faveDiv.innerHTML += `<li class="li-fave">
    // <div class="div-fave1">
    // <span class="fave-name">${getInfo.name}</span>
    // </div>

    // <div class="div-fave2">

    // <div class="fave-info">
    //  <p>Height: ${getInfo.height}<p>
    // <p>Mass: ${getInfo.mass}<p>
    // <p>Hair color: ${getInfo.hair_color}<p>
    // <p>Skin color: ${getInfo.skin_color}<p>
    // <p>Eye color: ${getInfo.eye_color}<p>
    // <p>Birth year: ${getInfo.birth_year}<p>
    // <p>Gender: ${getInfo.gender}<p>  
    // </div>

    // <div class="fave-pic"><div>
    // <div class="fave-quote">Quote<div>
    // </div>

    // <div class="div-fave3">
    // <input type="file" id="file-input" accept="image/png, image/jpeg" onchange="preview()" multiple>
    // <label for="file-input"><i class="fa-solid fa-image"></i> &nbsp;Upload a Photo</label>
    // </input>
    // <i class="fa-solid fa-quote-left"></i>
    // <i class="fa-solid fa-trash" onclick="removeFave()"></i>
    // </div>
    // </li>`;

    faveDiv.insertAdjacentHTML("beforeend", `<li class="li-fave">
    <div class="div-fave1">
    <span class="fave-name">${getInfo.name}</span>
    </div>

    <div class="div-fave2">

    <div class="fave-info">
     <p>Height: ${getInfo.height}<p>
    <p>Mass: ${getInfo.mass}<p>
    <p>Hair color: ${getInfo.hair_color}<p>
    <p>Skin color: ${getInfo.skin_color}<p>
    <p>Eye color: ${getInfo.eye_color}<p>
    <p>Birth year: ${getInfo.birth_year}<p>
    <p>Gender: ${getInfo.gender}<p>  
    </div>

    <div class="fave-pic"><div>
    <div class="fave-quote">Quote<div>
    </div>

    <div class="div-fave3">
    <input type="file" id="file-input" accept="image/png, image/jpeg" onchange="preview()" multiple>
    <label for="file-input"><i class="fa-solid fa-image"></i> &nbsp;Upload a Photo</label>
    </input>
    <i class="fa-solid fa-quote-left"></i>
    <i class="fa-solid fa-trash" onclick="removeFave()"></i>
    </div>
    </li>`);


    favePeople.push(fave);
    fave.style.display = "none";
  }

}

//Adding image for favorite characters
function preview() {
  favePic.innerHTML = "";

  for (i of fileInput.files) {
    let reader = new FileReader();
    let figure = document.createElement("figure");
    let figCap = document.createElement("figcaption");
    figCap.innerText = i.name;
    figure.appendChild(figCap);
    reader.onload = () => {
      console.log("uploaded")
      let img = document.createElement("img");
      img.setAttribute("src", reader.result);
      figure.insertBefore(img, figCap);
    };
    favePic.appendChild(figure);
    reader.readAsDataURL(i);
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

//Side panel
const x = window.matchMedia("(min-width: 768px)");

function openNav() {
  // if (x.matches) {
  if (faveDiv.style.display === "none") {
    faveDiv.style.display = "block";
    faveDiv.style.width = "500px";
    document.body.style.marginRight = "500px";
    viewBtn.innerHTML = `<i class="fa-solid fa-eye-slash view"></i> Close List`;
  } else {
    faveDiv.style.display = "none";
    faveDiv.style.width = "250px";
    document.body.style.marginRight = "0";
    viewBtn.innerHTML = `<i class="fa-solid fa-eye view"></i> View List`;
  }
}

// function closeNav() {
//   faveDiv.style.width = "0";
//   document.body.style.marginRight = "0";
// }

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

showPeople();

window.onload = () => {
    console.log("Loading people from star wars api");
    getPeople('https://swapi.dev/api/people');
  }
  
  async function getPeople(url) {
    /*
    const response = await fetch(url);
    const json = await response.json();
    renderPeople(json);*/
  
    fetch(url)
      .then((response) => response.json())
      .then((people) => renderPeople(people))
      .catch((error) => console.log(error));
  }
  
  function renderPeople(people) {
    console.log(people);
    const parent = document.getElementById('people');
    const list = document.createElement('ul');
    for(let person of people.results) {
      list.appendChild(renderPerson(person));
    }
    parent.replaceChildren(list);
  
    if (people.previous) {
      const prev = document.createElement('button');
      prev.innerText = 'Previous';
      prev.classList.add('prev');
      prev.addEventListener('click', (event) => {
        getPeople(people.previous);
      });
      parent.appendChild(prev);
    }  
  
    if (people.next) {
      const next = document.createElement('button');
      next.innerText = 'Next';
      next.classList.add('next');
      next.addEventListener('click', (event) => {
        getPeople(people.next);
      });
      parent.appendChild(next);
    }
  }
  
  function renderPerson(person) {
    const li = document.createElement('li');
    let html = `<h3>${person.name}</h3>`;
    html += `<div class="attributes">Birth Year: ${person.birth_year} Gender: ${person.gender} Hair: ${person.hair_color}</div>`;
    html += `<div class="ships">`;
    for(let ship of person.starships) {
      html += `<a href="${ship}">Ship</a>`;
    }
    html += '</div>';
    li.innerHTML = html;
    return li;
  }
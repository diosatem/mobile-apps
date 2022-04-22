const links = [
    {
      label: "Week 1 notes",
      url: "week1/index.html"
    }
  ]
  const theList = document.querySelector('#wdd330Assign');

  // loops through the links array and grabs the label and sets it in the li
for (i = 0; i <= links.length - 1; i++) {
    const li = document.createElement('li');
    //adding the id addLink so I can loop through and add the a tags inside the li
    li.setAttribute('id', 'addLink');
    li.innerText = links[i].label + ': '

    // const a = document.createElement('a')
    // a.setAttribute('href', links[i].url);

    theList.appendChild(li);
}

//grabs the li nested in the ul 
const theLi = document.querySelector('#addLink');

// loops again to add the links to the li element


for (i = 0; i <= links.length - 1; i++){
    const a = document.createElement('a');
    a.setAttribute('href', links[i].url);
    a.innerText = "Click Here";

    theLi.appendChild(a);
}
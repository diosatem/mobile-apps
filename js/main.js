
// let text = "";
// const links = [
//     {
//       label: "Week 1 notes",
//       url: "week1/index.html"
//     },
//     {
//       label: "Week 2 notes",
//       url: "to be posted"
//     }
//   ]
//   const theList = document.querySelector('#wdd330Assign');

//   links.forEach(myFunction);

//   document.getElementById("wdd330Assign").innerHTML = text;
 
//   function myFunction(item, index) {
//     text += index + ": " + item + "<br>"; 
//   }

function showWeekList() {
  const allWeeks = [
      {
        label: "1",
url: "week1/index.html"
      },
      {
        label: "2",
        url: "week2/index.html"
      },
     
  ]
  var namelist = allWeeks.map(function (t, i) {
    return `<b>Week # : </b> ${t.label}<br/><b>URL : </b> <a href=${t.url}>${t.url}</a><br/><br/>`;
  })

  document.getElementById('wdd330Assign').innerHTML =
    '<li>' + namelist.join('</li><li>') + '</li>'
}

showWeekList()

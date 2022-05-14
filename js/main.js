
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
      {
        label: "3",
        url: "week3/index.html"
      },
<<<<<<< HEAD
      {
        label: "4",
        url: "week4/index.html"
      },
=======
>>>>>>> 5568aff6ebf7b76f78635016354702d84945c80c
     
  ]
  var namelist = allWeeks.map(function (t, i) {
    return `<b>Week # : </b> ${t.label}<br/><b>URL : </b> <a href=${t.url}>${t.url}</a><br/><br/>`;
  })

  document.getElementById('wdd330Assign').innerHTML =
    '<li>' + namelist.join('</li><li>') + '</li>'
}

showWeekList()

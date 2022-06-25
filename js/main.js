
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
      {
        label: "4",
        url: "week4/index.html"
      },
      {
        label: "5",
        url: "week5/index.html"
      },
      {
        label: "6",
        url: "week6/index.html"
      },
      {
        label: "7",
        url: "week7/index.html"
      },
      {
        label: "8",
        url: "week8/index.html"
      },
      
      {
        label: "9",
        url: "week9/index.html"
      },
      {
        label: "10",
        url: "week10/index.html"
      },
  ]
  var namelist = allWeeks.map(function (t, i) {
    return `<b>Week # : </b> ${t.label}<br/><b>URL : </b> <a href=${t.url}>${t.url}</a><br/><br/>`;
  })

  document.getElementById('wdd330Assign').innerHTML =
    '<li>' + namelist.join('</li><li>') + '</li>'
}

showWeekList()

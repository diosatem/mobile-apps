
//create the href list
function listWeeklyItems(weekItems, listElementName) {
    let ol = document.getElementById(listElementName);
    if(ol) {

        //loop through anonymous objects
        weekItems.forEach(element => {

            //create the anchor and set attributes
            let anchor = document.createElement('a');
            anchor.innerHTML = element.label;
            anchor.href = element.url;

            //create list item and attach anchor
            let li = document.createElement('li');
            li.appendChild(anchor);
            
            ol.appendChild(li);
        });
    }
}

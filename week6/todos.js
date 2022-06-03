// import { getTask, setTask } from "./ls";

//Selectors
const userInput = document.getElementById("user-input");
const btnAddTask = document.getElementById("add-task-btn");
const filter = document.getElementById("filter");
const taskList = document.getElementById("ul-list");
const taskListItem = document.getElementById("li-task");



let taskForm = document.getElementById("task-form");
const taskNumber = document.getElementById("task-number");
const btnDeleteTask = document.getElementById("delete-task");
const taskItem = document.getElementById("item");
const checkItem = document.getElementById("check-task");
const completeItem = document.getElementById("complete");
const alertMsg = document.getElementById("alert-msg");


//Event listeners
document.addEventListener("DOMContentLoaded", displayItems);
btnAddTask.addEventListener("click", addItems);
taskList.addEventListener("click", deleteItems);
filter.addEventListener("click", filterItems);

//Functions
function addItems(event) {
    // event.preventDefault();
    taskList.innerHTML += `<li id="li-task" class="li-task"><input type="checkbox" id="check-task" class="check-task" name="task" value="task" onclick=""> <label for="check-task">${userInput.value}</label> <button class="delete-task" onclick="deleteItems()">X</button></li>`;
    saveToLocal(userInput.value);
    userInput.value = "";
}

function deleteItems(event) {
    const item = event.target;
    if (item.classList[0] === "delete-task") {
        const removeLi = item.parentElement;
        // deleteFromLocal(item);
        removeLi.remove();
    }
    if (item.classList[0] === "check-task") {
        const removeLi = item.parentElement;
        removeLi.classList.toggle("completed");
    }
}

function filterItems(event) {
    const listChildNodes = [...taskList.childNodes];
    console.log(listChildNodes);
    listChildNodes.filter(function (taskNode) {
        if (taskNode.classList != "completed") {
            console.log("completed");
            console.log(taskNode);
        } else {
            console.log("not completed");
        }
    });
}

function saveToLocal(item) {
    let items;
    if (localStorage.getItem("items") === null) {
        items = [];
    } else {
        items = JSON.parse(localStorage.getItem("items"));;
    }
    items.push(item);
    localStorage.setItem("items", JSON.stringify(items));
}

function displayItems() {
    let items;
    if (localStorage.getItem("items") === null) {
        items = [];
    } else {
        items = JSON.parse(localStorage.getItem("items"));;
    }
    items.forEach(function (item) {
        taskList.innerHTML += `<li id="li-task" class="li-task"><input type="checkbox" id="check-task" class="check-task" name="task" value="task" onclick=""> <label for="check-task">${item.value}</label> <button class="delete-task" onclick="deleteItems()">X</button></li>`;
    });
}

function deleteFromLocal(item) {
    let items;
    if (localStorage.getItem("items") === null) {
        items = [];
    } else {
        items = JSON.parse(localStorage.getItem("items"));;
    }

    const itemsIndex = items.children[0].innerText;
    items.splice(items.indexOf(itemsIndex), 1);
    localStorage.setItem("items", JSON.stringify(items));
}


// switch(event.target.className) {
//     case "all":
//         liTask.style.display = "flex";
//     console.log("hello");
//         break;

//     case "completed":
//         if (taskList.classList.contains("completed")) {
//             liTask.style.display = "flex";
//         } else {
//             liTask.style.display = "none";
//         }
//         break;

//     case "active":
//         if (!liTask.classList.contains("completed")) {
//             liTask.style.display = "flex";
//         } else {
//             liTask.style.display = "none";
//         }
//         break;
// }
//    }
// }




// window.onload = checkInput();

// function checkInput() {
//     if (getTask != null) {
//         items = getTask;
//         displayTask();
//     }  
// }

// btnAddTask.onclick = addItems => {    
//     if (userInput.value.trim() != "") {        
//         items.push(userInput.value.trim());
//         console.log(items);
//         console.log(localStorage);
//         alertMsg.innerHTML = "Task successfully added.";
//         alertMsg.style.color = "green";
//         if (getTask == null) {
//             setTask;           
//         } else {
//             setTask;            
//         }
//         displayTask();

//     } else {
//         alertMsg.innerHTML = "Add a task!";
//         alertMsg.style.color = "red";
//     }
// }

// function displayTask() {    
//     taskList.innerHTML = "";    
//     for (let i = 0; i < items.length; i++) { 
//         taskList.innerHTML += `<li class="li-task"><input type="checkbox" id="check-task" class="check-task" name="task" value="task" onclick="(${[i]})"> <label for="check-task">${items[i]}</label> <button id="delete-task" onclick="deleteTask(${[i]})">X</button></li>`;
//     }

// taskNumber.innerHTML = `${items.length} tasks left`;
// }

// function deleteTask(index) {
//     items.splice(index, 1);
//     if (getTask == null) {
//         setTask;
//     } else {
//         setTask;
//     }
//     displayTask();
// }

// checkItem.onclick = () => {
//     completeItem;
// }
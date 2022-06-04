// import { getTask, setTask } from "./ls";

//Selectors
const userInput = document.getElementById("user-input");
const btnAddTask = document.getElementById("add-task-btn");
const filter = document.getElementById("filter");
const taskList = document.getElementById("ul-list");
const taskListItem = document.getElementById("li-task");
const alertMsg = document.getElementById("alert-msg");

//Event listeners
document.addEventListener("DOMContentLoaded", displayItems);
btnAddTask.addEventListener("click", addItems);
taskList.addEventListener("click", deleteItems);
filter.addEventListener("click", filterItems);

//Functions
function addItems(event) {
    if (userInput.value.trim() != "") {
        alertMsg.innerHTML = "Task successfully added.";
        alertMsg.style.color = "green";

    } else {
        alertMsg.innerHTML = "Add a task!";
        alertMsg.style.color = "red";
    }
    taskList.innerHTML += `<li id="li-task" class="li-task"><input type="checkbox" id="check-task" class="check-task" name="task" value="task" onclick=""> <label for="check-task">${userInput.value}</label> <button class="delete-task">X</button></li>`;
    saveToLocal(userInput.value);
    userInput.value = "";
}

function deleteItems(event) {
    const item = event.target;
    if (item.classList[0] === "delete-task") {
        const removeLi = item.parentElement;
        deleteFromLocal(item);
        removeLi.remove();
    }
    if (item.classList[0] === "check-task") {
        const removeLi = item.parentElement;
        removeLi.classList.toggle("completed");
    }
}

function filterItems(event) {
    const listChildNodes = [...taskList.children];
    for (const nodeItem of listChildNodes) {
        switch (event.target.className) {
            case "all":
                nodeItem.style.display = "flex";               
                break;

            case "completed":
                if (nodeItem.classList.contains("completed")) {
                    nodeItem.style.display = "flex";
                } else {
                    nodeItem.style.display = "none";
                }
                break;

            case "active":
                if (!nodeItem.classList.contains("completed")) {
                    nodeItem.style.display = "flex";
                } else {
                    nodeItem.style.display = "none";
                }
                break;
        }
    }
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
    console.log(items);
}

function displayItems(item) {
    let items;
    if (localStorage.getItem("items") === null) {
        items = [];
    } else {
        items = JSON.parse(localStorage.getItem("items"));;
    }
    items.forEach(function (item) {
        taskList.innerHTML += `<li id="li-task" class="li-task"><input type="checkbox" id="check-task" class="check-task" name="task" value="task" onclick=""> <label for="check-task">${item}</label> <button class="delete-task" onclick="deleteItems()">X</button></li>`;
    });
}

function deleteFromLocal(item) {
    let items;
    if (localStorage.getItem("items") === null) {
        items = [];
    } else {
        items = JSON.parse(localStorage.getItem("items"));;
    }

    const itemsIndex = item.children[0];
    items.splice(items.indexOf(itemsIndex), 1);
    localStorage.setItem("items", JSON.stringify(items));
}

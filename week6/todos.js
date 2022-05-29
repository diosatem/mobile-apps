let taskForm = document.getElementById("task-form");
const userInput = document.getElementById("user-input");
const btnAddTask = document.getElementById("add-task");
const taskList = document.getElementById("ul-list");
const taskListItem = document.getElementById("li-task");
const taskNumber = document.getElementById("task-number");
const btnDeleteTask = document.getElementById("delete-task");
const taskItem = document.getElementById('item');
const checkItem = document.getElementById('check-task');
const completeItem = document.getElementById('complete');
const alertMsg = document.getElementById("alert-msg");
let items = [];
let setTask = localStorage.setItem("taskItems", JSON.stringify(items));
let getTask = JSON.parse(localStorage.getItem("taskItems"));

window.onload = () => {
    if (getTask != null) {
        items = getTask;
        console.log(items);
        displayTask();
    }  
}

btnAddTask.onclick = addItems => {
    if (userInput.value.trim() != "") {
        alertMsg.innerHTML = "Task successfully added.";
        alertMsg.style.color = "green";
        items.push(userInput.value.trim());
        if (getTask == null) {
            setTask;           
        } else {
            setTask;            
        }
        displayTask();
        
    } else {
        alertMsg.innerHTML = "Add a task!";
        alertMsg.style.color = "red";
    }
}

function displayTask() {
    taskList.innerHTML = "";

    for (let i = 0; i < items.length; i++) {
        taskList.innerHTML += `<li class="li-task"><input type="checkbox" id="check-task" class="check-task" name="task" value="task" onclick="(${[i]})"> <label for="check-task">${items[i]}</label> <button id="delete-task" onclick="deleteTask(${[i]})">X</button></li>`;
    }

    taskNumber.innerHTML = `${items.length} tasks left`;
}

function deleteTask(index) {
    items.splice(index, 1);
    if (getTask == null) {
        setTask;
    } else {
        setTask;
    }
    displayTask();
}

// checkItem.onclick = () => {
//     completeItem;
// }
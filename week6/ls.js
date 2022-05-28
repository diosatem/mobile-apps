const userInput = document.getElementById("user-input");
const taskValue = userInput.value;
const btnAddTask = document.getElementById("add-task");
const taskList = document.getElementById("ul-list");
const taskNumber = document.getElementById("task-number");
const btnDeleteTask = document.getElementById("delete-task");
const taskItem = document.getElementById('item');
const alert = document.getElementById('alert-msg');

const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];

function addTaskItem(txt) {
    taskList.innerHTML += `<li class="li-task"><input type="checkbox" id="input-task" class="input-task" name="task" value="My Task"> <label for="input-task">${taskV}</label> <button id="delete-task">X</button></li>`;

    delBtn.addEventListener("click", (e) => {
        li.parentNode.removeChild(li);
        savedTasks = savedTasks.filter((e) => e !== txt);
        localStorage.setItem("tasks", JSON.stringify(savedTasks));
      });

btnAddTask.onclick = function () {
    if (taskValue === "") {
        alert.innerHTML = "Please add a task to proceed.";
    } else {
        savedTasks.push(txt);
        localStorage.setItem("tasks", JSON.stringify(savedTasks));
        input.value = "";
        addUIItem(txt);
    }




    // taskArr.push(taskValue);
    // if (tasks && taskValue) {
    //     localStorage.setItem("tasks", JSON.stringify([...JSON.parse(localStorage.getItem("tasks") || "[]"), {
    //         task: tasks.value,
    //         completed: false
    //     }]));
    // location.reload();

}


//     for (let i = 0; i < localStorage.length; i++) {
//         const taskInput = localStorage.key(i),
//             taskV = JSON.parse(localStorage.getItem(taskInput));

//         taskList.innerHTML += `<li class="li-task"><input type="checkbox" id="input-task" class="input-task" name="task" value="My Task"> <label for="input-task">${taskV}</label> <button id="delete-task">X</button></li>`;

//     }
// };
taskNumber.innerHTML = `${localStorage.length} tasks left`;
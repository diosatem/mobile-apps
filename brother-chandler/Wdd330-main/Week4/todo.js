/*
private:
read/write localStorage
*/
import { writeToLS, readFromLS, bindTouch } from "./utils.js";

// we need a place to store our list of todos in memory
let liveToDos = null;

// View code here
function renderList(list, element, toDos, hidden) {
  console.log(list);
  element.innerHTML = "";

  list.forEach(toDo => {
    const item = document.createElement("li");
    const formattedDate = new Date(toDo.id).toLocaleDateString("en-US");

    let cb = null;
    let btn = null;

    if(hidden && toDo.completed){
        item.innerHTML = `<label><input type="checkbox" checked><strike> ${toDo.content}</strike></label><button>X</button>`;
    }
    else {
      item.innerHTML = `<label><input type="checkbox"> ${toDo.content}</label><button>X</button>`;
    }

    //Wire listener to the checkbox
    cb = item.childNodes[0].childNodes[0];

    if(cb){
      cb.addEventListener("change",function() {
        toDos.completeToDo(toDo.id);
      });  
    }

    //wire listener to the button
    btn = item.childNodes[1];
    if(btn) {
      btn.addEventListener("click", function() {
        toDos.removeToDo(toDo.id);
      });
    }

    element.appendChild(item);
  });
}

function getToDos(key) {
  if (liveToDos === null) {
    // we need to go read the list from the data store
    liveToDos = readFromLS(key) || [];
  }

  return liveToDos;
}

function addToDo(value, key) {
  // use Date.now() for UTC millisecond string.
  const newToDo = {
    id: new Date(),
    content: value,
    completed: false
  };

  liveToDos.push(newToDo);
  writeToLS(key, liveToDos);
}

function deleteToDo(key) {
  let newList = liveToDos.filter(item => item.id != key);
  liveToDos = newList;
  writeToLS(key, liveToDos);
}


// this would be done last if you still have time...and if you haven't blown too many minds yet :)  If you do get here...mention how similar this method is with getToDos...they could probably be combined easily.
function filterToDos(key, completed = true) {
  let toDos = getToDos(key);

  // return a list of either completed or not completed toDos based on the parameter.
  return toDos.filter(item => item.completed === hidden);
}

// public
export default class ToDos {
  
  constructor(listElement, key) {
    // opted to store the listElement inside the class.
    console.log(this.listElement);
    this.listElement = listElement;
    console.log(this.listElement);

    // key for localStorage saving and lookup
    this.key = key;
    // why bind here?
    bindTouch("#addToDo", this.newToDo.bind(this));
    this.listToDos();
  }

  newToDo() {
    const task = document.getElementById("todoInput");
    addToDo(task.value, this.key);
    task.value = "";
    this.listToDos();
  }
  
  findTodo(id) {
    let toDo = liveToDos.find( element => {
      return element.id === id;
    });
  
    return toDo;
  }
  completeToDo(id) {
    console.log(id + "checked");
    let toDo = this.findTodo(id);
  
    if(toDo){
      toDo.completed = !toDo.completed;
      writeToLS(this.key, liveToDos);
      renderList(liveToDos, this.listElement,this, true);
    }  
  }

  removeToDo(id) {
    console.log(id + "removed");
    let toDo = this.findTodo(id);
  
    if(toDo){
      deleteToDo(id);
      renderList(liveToDos, this.listElement,this, true);
    }  
  }


  listToDos(hidden = true) {
    renderList(getToDos(this.key), this.listElement, this, hidden);
  }
}

//  This could also be done as a simple object literal as well.
// const ToDos = {
//   _key: null,
//   _listElement: null,
//   newToDo: function(value) {
//     addToDo(value);
//     this.listToDos();
//   },
//   listToDos: function(hidden = true) {
//     renderList(getToDos(), this.listElement, hidden);
//   }
// };

// export default toDos;

// SELECT ELEMENTS FROM DOM
const clear = document.querySelector(".clear");
const date = document.querySelector("#date");
const list = document.getElementById("list");
const input = document.querySelector("#input");
const add = document.getElementById("add-btn");
const div = document.createElement("div");
const content = document.querySelector(".content");
const empty = `<div id="empty">No Todos yet.</div>`;
// Use Full classes
const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle-thin";
const LINE_THROUGH = "lineThrough";
// variables
let LIST, id;
// Functions
addEmpty();
function addEmpty() {
  const childNodes = [...content.childNodes];
  let add = true;
  childNodes.map((element, index) => {
    if (childNodes[index].id == "empty") {
      add = false;
      return;
    }
  });
  if (add) {
    content.insertAdjacentHTML("beforeend", empty);
  }
}
function removeEmpty() {
  try {
    content.removeChild(document.getElementById("empty"));
  } catch (error) {}
}
// Add Todo
function addTodo(todo, id, done) {
  removeEmpty();
  const DONE = done ? CHECK : UNCHECK;
  const LINE = done ? LINE_THROUGH : "";

  const item = `<li class="item">
                    <i title="Done" class="fa ${DONE} co" job="complete" id="${id}"></i>
                    <p class="text ${LINE}">${todo}</p>
                    <i title="Delete this item" class="fa fa-trash-o de" job="delete" id="${id}"></i>
                  </li>
                `;
  const position = "beforeend";
  if (todo) {
    list.insertAdjacentHTML(position, item);
    input.value = "";
  }
}
// remove todo
function removeTodo(element) {
  element.parentNode.parentNode.removeChild(element.parentNode);
  LIST.pop(element.id);
  localStorage.setItem("ANTUTODO", JSON.stringify(LIST));
  if (LIST.length) {
    return;
  }
  addEmpty();
}
// compelet todo
function completeTodo(element) {
  element.classList.toggle(CHECK);
  element.classList.toggle(UNCHECK);
  element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);

  LIST[element.id].done = LIST[element.id].done ? false : true;
  localStorage.setItem("ANTUTODO", JSON.stringify(LIST));
}
function loadList(array) {
  array.forEach(function (item) {
    addTodo(item.name, item.id, item.done);
  });
}
// Logics
// Get item form localstorage
let data = localStorage.getItem("ANTUTODO");
if (data) {
  LIST = JSON.parse(data);
  id = LIST.length;
  loadList(LIST);
} else {
  LIST = [];
  id = 0;
  addEmpty();
}
// clear local storage
function clearItems() {
  if (LIST.length) {
    if (confirm("Are you sure! This can't be undone.")) {
      localStorage.clear();
      location.reload();
    }
  }
}
clear.addEventListener("click", () => {
  clearItems();
});
// Show Date to the UI
const options = { weekday: "long", month: "short", day: "numeric" };
const today = new Date();
date.innerHTML = today.toLocaleDateString("en-us", options);
add.addEventListener("click", (event) => {
  const todo = input.value;
  addTodo(todo, id, false);
  LIST.push({
    name: todo,
    id: id,
    done: false,
  });
  localStorage.setItem("ANTUTODO", JSON.stringify(LIST));
});
document.addEventListener("keyup", (event) => {
  if (event.keyCode == 13) {
    todo = input.value;
    if (todo) {
      addTodo(todo, id, false);
      LIST.push({
        name: todo,
        id: id,
        done: false,
      });
      localStorage.setItem("ANTUTODO", JSON.stringify(LIST));
    }
  }
});
// listen to delete or complete events
list.addEventListener("click", (event) => {
  const element = event.target;
  const elementJob = element.attributes.job.value;

  if (elementJob == "complete") {
    completeTodo(element);
  } else if (elementJob == "delete") {
    removeTodo(element);
  }
  localStorage.setItem("ANTUTODO", JSON.stringify(LIST));
});

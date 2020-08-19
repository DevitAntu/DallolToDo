// User
const body = document.body;
let showemail, place, message;
function userForm(type, isNewUser) {
  try {
    if (isNewUser) {
      document.getElementById("userform").style.display = "none";
    }
  } catch (error) {}
  if (isNewUser) {
    showemail = `<input type="email" id="email" name="email" placeholder="Email" />`;
    place = "";
    message = "";
  } else {
    showemail = "";
    place = "Or Email";
    message = `<p style="color: white;">New Here <a href="#" style="color: aqua;"id='SignUp'>Sign Up</a></p>`;
  }
  body.insertAdjacentHTML(
    "afterbegin",
    `<div id="userform">
    
<form id="center">
<h2 id="notify" style="color: white;">${type}</h2>
  <input type="text" id="userName" name="userName"  placeholder="UserName ${place}" />
  ${showemail}
  <input type="password" id="password" name="password" placeholder="Password" />
  <button type="button">${type}</button>
  ${message}
</form>
</div>`
  );
}

let newUser = false;
let users, userid;
let usersdata = localStorage.getItem("Users");
if (usersdata) {
  userForm("Login", newUser);
  loadUser();
} else {
  userForm("Sign Up", true);
  signUser();
}

function signUser() {
  users = [];
  userid = 0;
  const btn = document.querySelector('form button[type="button"]');
  btn.addEventListener("click", (event) => {
    event.target.preventDefault;
    const formName = document.getElementById("userName").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    addUser(formName, userid, email, password);
    getUser(formName, password, false);
    document.getElementById("userform").style.display = "none";
  });
}
function loadUser() {
  users = JSON.parse(usersdata);
  userid = users.length;

  const butn = document.querySelector('form button[type="button"]');
  butn.addEventListener("click", (event) => {
    event.target.preventDefault;
    const User = document.getElementById("userName").value;
    const password = document.getElementById("password").value;
    getUser(User, password, true);
    loadTodo();
  });
  const SignUp = document.getElementById("SignUp");
  SignUp.addEventListener("click", () => {
    newUser = true;
    userForm("Sign Up", newUser);
    const btn = document.querySelector('form button[type="button"]');
    btn.addEventListener("click", (event) => {
      event.target.preventDefault;
      const email = document.getElementById("email").value;
      const User = document.getElementById("userName").value;
      const password = document.getElementById("password").value;
      addUser(User, userid, email, password);
      getUser(User, password, false);
      return;
    });
  });
}
// Add User
function addUser(userName, userId, email, password) {
  users.push({
    userName: userName,
    email: email,
    password: password,
    userid: userId,
    todos: [],
  });
  localStorage.setItem("Users", JSON.stringify(users));
}
function getUser(userName, password, auth) {
  for (let i = 0; i < users.length; i++) {
    const user = users[i];
    if (
      (userName == user.userName && user.password == password) ||
      (userName == user.email && user.password == password)
    ) {
      window.currentuserId = user.userid;
      document.getElementById("userform").style.display = "none";
      body.insertAdjacentHTML(
        "afterbegin",
        `
        <div class="name">
        <h1>ToDos</h1>
        <button title="${user.userName} : ${user.email}"style="cursor: pointer;" onClick="logout()">Log Out</button>
        </div>
      `
      );
      showStatus(user.todos.length);
    } else if (
      (userName == user.userName && user.password != password) ||
      (userName == user.email && user.password != password)
    ) {
      if (auth) {
        document.getElementById("password").style.border = "4px solid red";
        document.getElementById("password").value = "";
        document.getElementById("notify").style.color = "red";
        document.getElementById("notify").style.margin = "0";
        document.getElementById("notify").innerHTML =
          "<h3>Incorrect Password</h3>";
      }
    } else if (
      (userName != user.userName && user.password == password) ||
      (userName != user.email && user.password == password)
    ) {
      if (auth) {
        document.getElementById("userName").style.border = "4px solid red";
        document.getElementById("userName").value = "";
        document.getElementById("notify").style.color = "red";
        document.getElementById("notify").style.margin = "0";
        document.getElementById("notify").innerHTML =
          "<h3>Incorrect UserName Or Email</h3>";
      }
    }
  }
}
// Logout
function logout() {
  location.reload();
}
// Todo
// SELECT ELEMENTS FROM DOM
const clear = document.querySelector(".clear");
const date = document.querySelector("#date");
const list = document.getElementById("list");
const input = document.querySelector("#input");
const add = document.getElementById("add-btn");
const div = document.createElement("div");
const content = document.querySelector(".content");
const empty = `<div id="empty">No Todos yet.</>`;
const status = document.getElementById("status");
// Use Full classes
const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle-thin";
const LINE_THROUGH = "lineThrough";
// Show Date to UI
const options = { weekday: "long", month: "long", day: "numeric" };
const today = new Date();
date.innerHTML = today.toLocaleDateString("en-US", options);
let id = 0;
addEmpty();
// Add Empty
function addEmpty() {
  const childNodes = [...content.childNodes];
  let add = true;
  for (let index = 0; index < childNodes.length; index++) {
    if (childNodes[index].id == "empty") {
      add = false;
      return;
    }
  }
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
add.addEventListener("click", () => {
  addTodo(input.value, false);
});
list.addEventListener("click", (event) => {
  try {
    const element = event.target;
    const elementJob = element.attributes.job.value;
    if (elementJob == "complete") {
      completeTodo(element);
    } else if (elementJob == "menu") {
      const popup = document.querySelector(`.popup.pop-${element.id}`);
      popup.classList.toggle("block");
      popup.addEventListener("click", (event) => {
        const popelement = event.target;
        const popelementJob = popelement.attributes.job.value;
        if (popelementJob == "edit") {
          editTodo(popelement);
        } else if (popelementJob == "delete") {
          removeTodo(popelement);
        }
      });
      document.addEventListener("click", (event) => {
        const menu = document.querySelector(`.me-${event.target.id}`);
        if (event.target != popup && event.target != menu) {
          if (popup) {
            popup.classList.remove("block");
          }
        }
        if (popup) {
        }
      });
    }
  } catch (error) {}
});
// Show status
function showStatus(todolength) {
  status.innerHTML = `ToDo<span id="todos">${
    todolength >= 2 ? "s" : ""
  }</span>: <span id="todolength">${todolength}</span>`;
}

// Update status
function updateTodostatus(type) {
  let numOftodos =
    document.getElementById("todolength").textContent == "Zero"
      ? 0
      : Number(document.getElementById("todolength").textContent);
  let opretion = type == "add" ? (numOftodos += 1) : (numOftodos -= 1);
  document.getElementById("todolength").textContent = `${opretion}`;
}
// Get Current User Todos
let toDoId;
let currentUserTodos;
function getcurrentUserTodos() {
  for (let index = 0; index < users.length; index++) {
    const user = users[index];
    if (user.userid == currentuserId) {
      if (user.todos) {
        currentUserTodos = user.todos;
        toDoId = currentUserTodos.length;
      } else {
        toDoId = 0;
      }
    }
  }
}
clear.addEventListener("click", () => {
  getcurrentUserTodos();
  currentUserTodos.map(() => {
    currentUserTodos.pop();
    currentUserTodos.shift();
  });
  list.innerHTML = "";
  document.getElementById("todolength").textContent = 0;
  document.getElementById("todos").textContent = "";
  localStorage.setItem("Users", JSON.stringify(users));
});
// Load Todos
function loadTodo() {
  for (const user of users) {
    if (!(user.userid == currentuserId)) continue;
    if (user.todos) {
      const todo = user.todos;
      todo.forEach((element) => {
        let todo = element.name;
        let done = element.done;
        let id = element.id;
        const DONE = done ? CHECK : UNCHECK;
        const LINE = done ? LINE_THROUGH : "";

        const item = `<li class="item">
                  <i title="Done" class="fa ${DONE} co" job="complete" id="${id}"></i>
                  <p class="text ${LINE}">${todo}</p>
                  <i class="fa fa-caret-down me me-${id}" id="${id}" job="menu" ></i>
                  <div class="popup pop-${id}">
                    <i class="fa fa-pencil ed" title="Edit" job="edit"  id="${id}"></i>
                    <i title="Delete" class="fa fa-trash-o de" job="delete" id="${id}"></i>
                  </div>
                </li>
                  `;
        const position = "beforeend";
        if (todo) {
          list.insertAdjacentHTML(position, item);
        }
        removeEmpty();
      });
    }
  }
}
function addTodo(todo, done) {
  getcurrentUserTodos();
  currentUserTodos.push({
    name: todo,
    id: toDoId,
    done: done,
  });
  const DONE = done ? CHECK : UNCHECK;
  const LINE = done ? LINE_THROUGH : "";

  const item = `<li class="item">
                  <i title="Done" class="fa ${DONE} co" job="complete" id="${toDoId}"></i>
                  <p class="text ${LINE}">${todo}</p>
                  <i class="fa fa-caret-down me me-${toDoId}" id="${toDoId}" job="menu" ></i>
                  <div class="popup pop-${toDoId}">
                    <i class="fa fa-pencil ed" title="Edit" job="edit"  id="${toDoId}"></i>
                    <i title="Delete" class="fa fa-trash-o de" job="delete" id="${toDoId}"></i>
                  </div>
                </li>
                  `;
  const position = "beforeend";
  if (todo) {
    list.insertAdjacentHTML(position, item);
    input.value = "";
  }
  const s = document.getElementById("todos");
  currentUserTodos.length >= 2 ? (s.textContent = "s") : (s.textContent = "");
  removeEmpty();
  localStorage.setItem("Users", JSON.stringify(users));
  updateTodostatus("add");
}
// edit Todo
function editTodo(element) {
  const text = element.parentNode.parentNode.querySelector(".text");
  text.innerHTML = `<input id="edited" autofocus type="text" value="${text.textContent}">`;
  text.addEventListener("keyup", (event) => {
    const edited = document.getElementById("edited");
    if (event.keyCode == 13) {
      text.textContent = `${edited.value}`;
      getcurrentUserTodos();
      currentUserTodos[element.id].name = `${edited.value}`;
      localStorage.setItem("Users", JSON.stringify(users));
    }
  });
}
// remove todo
function removeTodo(element) {
  try {
    element.parentNode.parentNode.parentNode.removeChild(
      element.parentNode.parentNode
    );
    getcurrentUserTodos();
    currentUserTodos.pop(element.id);

    localStorage.setItem("Users", JSON.stringify(users));
    updateTodostatus("remove");
    const s = document.getElementById("todos");
    currentUserTodos.length >= 2 ? (s.textContent = "s") : (s.textContent = "");
    if (currentUserTodos.length) {
      return;
    }
    addEmpty();
  } catch (err) {}
}
// compelet todo
function completeTodo(element) {
  element.classList.toggle(CHECK);
  element.classList.toggle(UNCHECK);
  element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);
  getcurrentUserTodos();
  currentUserTodos[element.id].done = currentUserTodos[element.id].done
    ? false
    : true;
  localStorage.setItem("Users", JSON.stringify(users));
}

input.addEventListener("keyup", (event) => {
  if (event.keyCode == 13) {
    todo = input.value;
    if (todo) {
      addTodo(todo, false);
      localStorage.setItem("Users", JSON.stringify(users));
    }
  }
});

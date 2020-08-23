// User
"use strict";
const body = document.body;
let meta;
function userForm(type, isNewUser, to) {
  try {
    if (isNewUser) {
      document.getElementById("userform").style.display = "none";
    }
  } catch (err) {}
  if (isNewUser) {
    meta = "";
  } else {
    meta = `<a class="forgetpassword" href="#"> Forgot Password? </a>`;
  }
  body.insertAdjacentHTML(
    "afterbegin",
    `<!-- Form-->
    <div class="container-login100" id="userform">
      <div class="wrap-login100">
        <form class="login100-form validate-form">
          <span class="login100-form-logo">
            <img src="./img/user-solid.svg" width="70px" />
          </span>

          <span class="login100-form-title">
            ${type}
          </span>

          <div
            class="wrap-input100 validate-input"
            data-validate="Username requierd"
          >
            <input class="input100 input" type="text" job="username" name="username" id="userName"/>
            <span class="focus-input100" data-placeholder="UserName"></span>
          </div>

          <div
            class="wrap-input100 validate-input"
            data-validate="Password requierd"
          >
            <input class="input100 input" type="password" job="password" id="password" name="pass" />
            <span class="focus-input100" data-placeholder="Password"></span>
          </div>
          <div class="contact100-form-checkbox">
            <input
              class="input-checkbox100 input"
              id="ckb1"
              type="checkbox"
              name="remember-me"
            />
            <label class="label-checkbox100" for="ckb1">
              Remember me
            </label>
          </div>

          <div  class="container-login100-form-btn">
            <button type="button"  id="submit" class="login100-form-btn button">
              ${type}
            </button>
          </div>
          <div class="meta">
            ${meta}
            <a class="signUp" id="signup"href="#">${to}</a>
          </div>
          
        </form>
      </div>
    </div>
    <!-- End Form -->`
  );
}
function onkeyup() {
  const form = [...document.querySelectorAll(".input100")];
  form.forEach((e) => {
    e.addEventListener("keyup", () => {
      if (e.value) {
        e.parentNode.classList.remove("alert-validate");
        e.classList.add("has-val");
        let submit = document.getElementById("submit");
        submit.removeAttribute("disabled");
        submit.classList.remove("disabled");
      } else {
        e.parentNode.classList.add("alert-validate");
        e.classList.remove("has-val");
        let submit = document.getElementById("submit");
        submit.setAttribute("disabled", "true");
        submit.classList.add("disabled");
      }
    });
  });
}
function isUserUnique() {
  const form = document.querySelectorAll(".input100");
  form.forEach((e) => {
    e.addEventListener("keyup", () => {
      for (let i = 0; i < users.length; i++) {
        const user = users[i];
        if (!e.value) {
          e.classList.remove("has-val");
        } else {
          e.classList.add("has-val");
        }
        if (e.attributes.job.value == "password") {
          if (!e.value) {
            e.parentNode.attributes[1].value = "Password requierd";
            e.parentNode.classList.add("alert-validate");
            let submit = document.getElementById("submit");
            submit.setAttribute("disabled", "true");
            submit.classList.add("disabled");
          }
        }
        if (e.attributes.job.value == "username") {
        }
        if (e.attributes.job.value == "username") {
          if (!e.value) {
            e.parentNode.classList.remove("yes");
            e.parentNode.attributes[1].value = "UserName requierd";
            e.parentNode.classList.add("alert-validate");
            let submit = document.getElementById("submit");
            submit.setAttribute("disabled", "true");
            submit.classList.add("disabled");
          } else if (user.userName == e.value) {
            e.parentNode.classList.remove("yes");
            e.parentNode.attributes[1].value = `${e.value} Unavialable`;
            e.parentNode.classList.add("alert-validate");
            let submit = document.getElementById("submit");
            submit.setAttribute("disabled", "true");
            submit.classList.add("disabled");
          } else if (user.userName != e.value) {
            e.parentNode.attributes[1].value = `${e.value} is avialable`;
            e.parentNode.classList.add("alert-validate", "yes");
            let submit = document.getElementById("submit");
            submit.removeAttribute("disabled");
            submit.classList.remove("disabled");
          }
        }
      }
    });
  });
}
let newUser = false;
let users, userid;
let usersdata = localStorage.getItem("Users");
if (usersdata) {
  userForm("Login", newUser, "SignUp");
  onkeyup();
  loadUser();
} else {
  userForm("Sign Up", true, "");
  onkeyup();
  signUser();
}
function isEmpty(name, password) {
  if (name.value && password.value) {
    addUser(name.value, users.length, password.value);
    getUser(name.value, password.value, false);
    document.getElementById("userform").style.display = "none";
    input.focus();
  } else if (name.value && !password.value) {
    password.focus();
    password.parentNode.attributes[1].value = "Password requierd";
    password.parentNode.classList.add("alert-validate");
    let submit = document.getElementById("submit");
    submit.setAttribute("disabled", "true");
    submit.classList.add("disabled");
  } else if (!name.value && password.value) {
    name.focus();
    name.parentNode.attributes[1].value = "UserName requierd";
    name.parentNode.classList.add("alert-validate");
    let submit = document.getElementById("submit");
    submit.setAttribute("disabled", "true");
    submit.classList.add("disabled");
  } else {
    let submit = document.getElementById("submit");
    submit.setAttribute("disabled", "true");
    submit.classList.add("disabled");
  }
}
function signUser() {
  users = [];
  userid = 0;
  const btn = document.getElementById("submit");
  btn.addEventListener("click", (event) => {
    event.target.preventDefault;
    const Name = document.getElementById("userName");
    const password = document.getElementById("password");
    isEmpty(Name, password);
  });
}
function loadUser() {
  users = JSON.parse(usersdata);
  userid = users.length;

  const btn = document.getElementById("submit");
  btn.addEventListener("click", (event) => {
    event.target.preventDefault;
    const User = document.getElementById("userName").value;
    const password = document.getElementById("password").value;
    if (User && password) {
      getUser(User, password, true);
      input.focus();
    } else {
      let submit = document.getElementById("submit");
      submit.setAttribute("disabled", "true");
      submit.classList.add("disabled");
    }
  });
  const SignUp = document.getElementById("signup");
  SignUp.addEventListener("click", () => {
    newUser = true;
    userForm("Sign Up", newUser, "Login");
    isUserUnique();
    const SignUp = document.getElementById("signup");
    SignUp.addEventListener("click", () => {
      location.reload();
    });
    const btn = document.getElementById("submit");
    btn.addEventListener("click", (event) => {
      event.target.preventDefault;
      const User = document.getElementById("userName");
      const password = document.getElementById("password");
      isEmpty(User, password);
      return;
    });
  });
}
// Add User
function addUser(userName, userId, password) {
  users.push({
    userName: userName,
    password: password,
    userid: userId,
    todos: [],
  });
  localStorage.setItem("Users", JSON.stringify(users));
}

// Get User
function getUser(userName, password, auth) {
  for (const user of users) {
    if (userName == user.userName && user.password == password) {
      window.currentuserId = user.userid;
      document.getElementById("userform").style.display = "none";
      showStatus(user.todos.length);
      if (auth) {
        loadTodo();
      }
    } else if (userName != user.userName && user.password != password) {
      if (!auth) return;
      document.getElementById("password").parentNode.attributes[1].value =
        "INCORRECT Password";
      document
        .getElementById("password")
        .parentNode.classList.add("alert-validate");
      document.getElementById("password").value = "";
      document.getElementById("userName").parentNode.attributes[1].value =
        "INCORRECT UserName";
      document
        .getElementById("userName")
        .parentNode.classList.add("alert-validate");
      return;
    } else if (userName == user.userName && user.password != password) {
      if (!auth) return;
      document.getElementById("password").value = "";
      document.getElementById("password").parentNode.attributes[1].value =
        "INCORRECT Password";
      document
        .getElementById("password")
        .parentNode.classList.add("alert-validate");
      return;
    } else if (userName != user.userName && user.password == password) {
      if (!auth) return;
      document.getElementById("userName").parentNode.attributes[1].value =
        "INCORRECT UserName";
      document
        .getElementById("userName")
        .parentNode.classList.add("alert-validate");
      document.getElementById("password").value = "";
      return;
    }
  }
}
// Todo
// SELECT ELEMENTS FROM DOM
const category = document.querySelector(".category");
const filter = document.querySelector(".mo");
const clear = document.querySelector(".clear");
const completed = document.querySelector("#fi-com");
const all = document.querySelector("#fi-al");
const date = document.querySelector("#date");
const list = document.getElementById("list");
const input = document.querySelector("#input");
const add = document.getElementById("add-btn");
const div = document.createElement("div");
const content = document.querySelector(".content");
const empty = `<div id="empty">No Todos yet.</div>`;
const status = document.getElementById("status");
// filter
all.addEventListener("click", () => {
  filterAll();
});
function filterAll() {
  all.classList.add("active");
  completed.classList.remove("active");
  getcurrentUserTodos();
  list.innerHTML = "";
  currentUserTodos.forEach((e) => {
    const DONE = e.done ? CHECK : UNCHECK;
    const LINE = e.done ? LINE_THROUGH : "";
    let item = `<li class="item">
    <i title="Done" class="fa ${DONE} co" job="complete" id="${e.id}"></i>
    <p class="text ${LINE}">${e.name}</p>
    <i class="fa fa-caret-down me me-${e.id}" id="${e.id}" job="menu" ></i>
    <div class="popup pop-${e.id}">
      <i class="fa fa-pencil ed" title="Edit" job="edit"  id="${e.id}"></i>
      <i title="Delete" class="fa fa-trash-o de" job="delete" id="${e.id}"></i>
    </div>
  </li>`;
    list.insertAdjacentHTML("beforeend", item);
  });
}
completed.addEventListener("click", () => {
  all.classList.remove("active");
  completed.classList.add("active");
  getcurrentUserTodos();
  list.innerHTML = "";
  currentUserTodos.forEach((e) => {
    if (e.done) {
      const DONE = e.done ? CHECK : UNCHECK;
      const LINE = e.done ? LINE_THROUGH : "";
      let item = `<li class="item">
    <i title="Done" class="fa ${DONE} co" job="complete" id="${e.id}"></i>
    <p class="text ${LINE}">${e.name}</p>
    <i class="fa fa-caret-down me me-${e.id}" id="${e.id}" job="menu" ></i>
    <div class="popup pop-${e.id}">
      <i class="fa fa-pencil ed" title="Edit" job="edit"  id="${e.id}"></i>
      <i title="Delete" class="fa fa-trash-o de" job="delete" id="${e.id}"></i>
    </div>
  </li>`;
      list.insertAdjacentHTML("beforeend", item);
    }
  });
});
filter.addEventListener("click", () => {
  category.classList.toggle("block");
  document.addEventListener("click", (e) => {
    if (e.target != category && e.target != filter) {
      category.classList.remove("block");
    }
  });
});
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
  if (input.value) {
    addTodo(input.value, false);
  }
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
  filterAll();
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
  text.innerHTML = `<input id="edited" type="text" value="${text.textContent}">`;
  const edited = document.getElementById("edited");
  edited.focus();
  text.addEventListener("keyup", (event) => {
    if (event.keyCode == 13) {
      if (edited.value) {
        text.textContent = `${edited.value}`;
        getcurrentUserTodos();
        currentUserTodos[element.id].name = `${edited.value}`;
        localStorage.setItem("Users", JSON.stringify(users));
      } else {
        edited.style.border = "2px solid red";
      }
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
    let todo = input.value;
    if (todo) {
      addTodo(todo, false);
      localStorage.setItem("Users", JSON.stringify(users));
    }
  }
});

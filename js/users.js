// User
const body = document.body;
let showemail, place, message;
function userForm(type, isNewUser) {
  try {
    if (isNewUser) {
      document.getElementById("userform").style.display = "none";
    }
  } catch (error) {
    console.log(`Catched!!! ${error}`);
  }
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
let users, userid, toDoId;
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
  toDoId = 0;
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
  users.map((user) => {
    if (
      (userName == user.userName && user.password == password) ||
      (userName == user.email && user.password == password)
    ) {
      document.getElementById("userform").style.display = "none";
      body.insertAdjacentHTML(
        "afterbegin",
        `
      <h1>Hi ${userName} You Have ${
          user.todos.length ? user.todos.length : "Zero"
        } todos</h1>
      `
      );
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
  });
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
// Use Full classes
const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle-thin";
const LINE_THROUGH = "lineThrough";
// Add Todo
function addTodo(userName, todo, id, done) {
  if (users.userName == userName) {
    users.todos.push({
      name: todo,
      id: id,
      done: done,
    });
  }
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
  localStorage.setItem("Users", users);
}
// remove todo
function removeTodo(element) {
  element.parentNode.parentNode.removeChild(element.parentNode);
  users.map((user) => {
    if (userName == user.userName) {
      user.todos.pop(element.id);
    }
  });
  localStorage.setItem("Users", JSON.stringify(users));
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

  users[userid].todos[element.id].done = users[userid].todos[element.id].done
    ? false
    : true;
  localStorage.setItem("Users", JSON.stringify(LIST));
}

// document.addEventListener("keyup", (event) => {
//   if (event.keyCode == 13) {
//     todo = input.value;
//     if (todo) {
//       addTodo(currentUser, todo, id, false);
//       localStorage.setItem("Users", JSON.stringify(users));
//     }
//   }
// });

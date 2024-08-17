let navUl = document.getElementById("nav-ul");
let signBtn = document.querySelector(".sign-btn");
let logBtn = document.querySelector(".log-btn");
let logSignUp = document.querySelector("#log-signUp");
let registration = document.querySelector("#registration");
let username = registration["username"];
let password = registration["password"];
let email = registration["email"];
let passwordCheck = registration["passwordCheck"];
let logInBtnHero = document.querySelector("#logInHero");
let title = document.querySelector(".hero-title");
let paragraph = document.querySelector(".hero-paragraph");
let login = document.querySelector("#login");
let passwordLogin = login["password"];
let userLogin = login["username"];
let signUpLogBtn = document.querySelector("#log-signUp");
let logStatus = false;

let users = JSON.parse(localStorage.getItem("users")) || [];

// username validation
function userNameValidation() {
  let uniqueChar = new Set(username.value.toLowerCase());
  let userRegEx = /^[a-zA-Z0-9]+$/;

  if (uniqueChar.size < 2) {
    username.setCustomValidity(
      "Username must contain at least two unique characters"
    );
    return false;
  } else if (username.value.length < 4) {
    username.setCustomValidity("Username must be at least 4 characters long");
    return false;
  } else if (!userRegEx.test(username.value)) {
    username.setCustomValidity(
      "Username must not contain any spaces or special characters"
    );
    return false;
  } else if (
    users.some(
      (user) => user.username.toLowerCase() === username.value.toLowerCase()
    )
  ) {
    username.setCustomValidity("Username already exists");
    return false;
  } else {
    username.setCustomValidity("");
    return true;
  }
}
username.addEventListener("input", userNameValidation);

// Email Validation
function emailValidation() {
  if (
    users.some((user) => user.email.toLowerCase() === email.value.toLowerCase())
  ) {
    email.setCustomValidity("Email already exists");
    return false;
  } else {
    email.setCustomValidity("");
    return true;
  }
}
email.addEventListener("input", emailValidation);

// Password Validation

function passwordValidation() {
  let passwordRegEx =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{12,}$/;
  if (!passwordRegEx.test(password.value)) {
    password.setCustomValidity(
      "The password must contain at least 12 characters, including one uppercase, one lowercase, one number, and one special character. "
    );
  } else if (password.value.toLowerCase().includes("password")) {
    password.setCustomValidity(
      "The password must not contain the word 'password'"
    );
    return false;
  } else if (
    password.value.toLowerCase().includes(username.value.toLowerCase())
  ) {
    password.setCustomValidity("The password must not contain the username");
    return false;
  } else if (password.value !== passwordCheck.value) {
    passwordCheck.setCustomValidity("Passwords do not match");
    return false;
  } else {
    passwordCheck.setCustomValidity("");
    password.setCustomValidity("");
    return true;
  }
}

password.addEventListener("input", passwordValidation);
passwordCheck.addEventListener("input", passwordValidation);

// Handling registration events

registration.addEventListener("submit", function (event) {
  if (!userNameValidation() || !emailValidation() || !passwordValidation()) {
    console.log("Validation failed, form not submitted.");
    event.preventDefault();
  } else {
    users.push({
      username: username.value,
      email: email.value,
      password: password.value,
    });
    logStatus = true;
    localStorage.setItem("users", JSON.stringify(users));
    // add functionality to redirect users once registered
  }
});

// Handling login events

// function loginCheck() {
//   let user = users.find(
//     (user) =>
//       user.username === logUser.value && user.password === logPassword.value
//   );

//   if (!user) {
//     logUser.setCustomValidity("Invalid username or password");
//     return false;
//   } else {
//     logUser.setCustomValidity("");
//     return true;
//   }
// }

// logUser.addEventListener("input", loginCheck);
// logPassword.addEventListener("input", loginCheck);
// login.addEventListener("submit", function (event) {
//   if (!loginCheck()) {
//     event.preventDefault();
//   } else {
//     logStatus = true;
//   }
// });

//Nav Buttons  functionality
function handleClick(e) {
  e.preventDefault();
  document.querySelector("#login-container").classList.toggle("hide");
  document.querySelector(".form-container").classList.toggle("hide");
  signBtn.classList.toggle("btn-inactive");
  logBtn.classList.toggle("btn-active");
}
function handleButton(btn) {
  btn.addEventListener("click", handleClick);
}

handleButton(signBtn);
handleButton(logBtn);
handleButton(logInBtnHero);
handleButton(logSignUp);
handleButton(signUpLogBtn);

// navigation links
const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

navLinks.forEach((link) => {
  const navLi = document.createElement("li");
  const navLink = document.createElement("a");
  navLink.classList.add("nav-links");
  navLink.textContent = link.label;
  navLink.href = link.href;
  navLi.appendChild(navLink);
  navUl.appendChild(navLi);
});

navUl.classList.add("menu");

document.querySelectorAll(".nav-links").forEach((link) => {
  link.addEventListener("click", (e) => {
    if (logStatus === false) {
      e.preventDefault();
    }
  });
});

// custom cursor
function createCircles() {
  const container = document.createElement("div");
  for (let i = 0; i < 50; i++) {
    const circle = document.createElement("div");
    circle.classList.add("circle");
    container.appendChild(circle);
  }
  document.body.appendChild(container);
}

createCircles();

const coords = { x: 0, y: 0 };
const circles = document.querySelectorAll(".circle");

circles.forEach(function (circle) {
  circle.x = 0;
  circle.y = 0;
});

window.addEventListener("mousemove", function (e) {
  coords.x = e.clientX;
  coords.y = e.clientY;
});

function animateCircles() {
  let x = coords.x;
  let y = coords.y;

  circles.forEach(function (circle, index) {
    circle.style.left = x - 12 + "px";
    circle.style.top = y - 12 + "px";

    circle.style.scale = (circles.length - index) / circles.length;
    circle.style.opacity = (circles.length - index) / circles.length;
    circle.x = x;
    circle.y = y;

    const nextCircle = circles[index + 1] || circles[0];
    x += (nextCircle.x - x) * 0.2;
    y += (nextCircle.y - y) * 0.2;
  });

  requestAnimationFrame(animateCircles);
}

animateCircles();

//perScholas2024!

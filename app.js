//nav and hero elements
let signBtn = document.querySelector(".sign-btn");
let logBtn = document.querySelector(".log-btn");
let navUl = document.getElementById("nav-ul");
let title = document.querySelector(".hero-title");
let paragraph = document.querySelector(".hero-paragraph");
let mainEl = document.getElementById("main-el");
let mainContent = document.querySelector("main-container");

// let registration = document.querySelector("#registration");
let username = registration["username"];
let password = registration["password"];
let passwordCheck = registration["passwordCheck"];
let email = registration["email"];
let logInBtnHero = document.querySelector("#logInHero");
let logSignUp = document.querySelector("#log-signUp");

// Login form elements
let login = document.querySelector("#login");
let userLogin = login["username"];
let passwordLogin = login["password"];
let signUpLogBtn = document.querySelector("#log-signUp");
let logStatus = false;

let users = JSON.parse(localStorage.getItem("users")) || [];
// front end functionality

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
    if (logStatus === true) {
      return true;
    }
    if (logStatus === false) {
      e.preventDefault();
      registration["username"].focus();
      login["username"].focus();
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
// Register and Login  functionality
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
    localStorage.setItem("users", JSON.stringify(users));
    // add functionality to redirect users once registered
  }
});

//perScholas2024!
// login functions
function logCheck() {
  let user = users.find(
    (user) =>
      user.username === userLogin.value && user.password === passwordLogin.value
  );
  if (!user) {
    userLogin.setCustomValidity("Invalid username or password");
    return false;
  } else {
    userLogin.setCustomValidity("");
    return true;
  }
}
userLogin.addEventListener("input", logCheck);
passwordLogin.addEventListener("input", logCheck);
login.addEventListener("submit", (e) => {
  if (!logCheck()) {
    e.preventDefault();
  }
  logStatus = true;
  logBtn.textContent = "Log Out";
  logBtn.addEventListener("click", () => {
    window.location.href = "index.html";
    logStatus = false;
  });

  signBtn.classList.add("hide");
  mainEl.innerHTML = `      <div class="main-logged-container">
        <div class="logged-hero">
          <div class="section-container">
            <div class="logged-hero-title-container">
              <h1 class="logged-hero-title transition">
                Welcome ${userLogin.value}! 
              </h1>
              <p class="logged-hero-paragraph transition">
                Discover the power of our secure and rewarding credit cards.
                Explore our range of credit cards and take control of your
                finances today.
              </p>
              <button class="explore-btn transition">Explore</button>
              <div class="users transition">
                <img src="./assets/user1.png" alt="user" class="user" />
                <img src="./assets/user2.png" alt="user" class="user" />
                <img src="./assets/user3.png" alt="user" class="user" />
                <div class="user-text">
                  <h3>10.2k+</h3>
                  <p>Active users around the world</p>
                </div>
              </div>
            </div>
          </div>
          <div class="card-container transition">
            <img
              src="assets/card.png"
              class="card"
              alt="credit-card"
              width="500"
              height="500"
            />
          </div>
        </div>
        <div class="brands-logged slide">
          <img src="/assets/brands.png" class="brands" alt="brands" />
          <img src="/assets/brands.png" class="brands" alt="brands" />
          <img src="/assets/brands.png" class="brands" alt="brands" />
          <img src="/assets/brands.png" class="brands" alt="brands" />
        </div>
      </div>
      `;
});

// perScholas2024!

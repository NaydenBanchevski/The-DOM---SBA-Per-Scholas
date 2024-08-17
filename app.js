let navUl = document.getElementById("nav-ul");

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

navLinks.forEach((link) => {
  const navLi = document.createElement("li");
  const navLink = document.createElement("a");
  navLink.textContent = link.label;
  navLink.href = link.href;
  navLi.appendChild(navLink);
  navUl.appendChild(navLi);
});

navUl.classList.add("menu");

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

const navUl = document.getElementById("nav-ul");

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

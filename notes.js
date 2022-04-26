/////////////////////////
/////////////////////////
// Selecting, Creating, and Deleting Elements
console.log(document.documentElement); // returns html
console.log(document.head); // returns head
console.log(document.body); // returns body

const header = document.querySelector(".header");
const allSections = document.querySelectorAll(".section");
console.log(allSections); // returns a NodeList with all elements with the class section

document.getElementById("section---1");
const allButtons = document.getElementsByTagName("button"); // returns an HTMLCollection (live selection);
console.log(allButtons);

console.log(document.getElementsByClassName("btn")); // returns an HTMLCollection

// Creating and inserting elements
// .insertAdjacentHTML
const message = document.createElement("div");

message.classList.add("cookie-message");

message.innerHTML =
  'We use cookies for improved funcationality and analytics. <button class="btn btn--close-cookie">Got it!</button>';

// Can use prepend and append methods to move the element (Child of the header)
// header.prepend(message);
header.append(message);

// If you want the element in two places at once you have to clone it
// header.append(message.cloneNode(true)); // Usually this is NOT something you want

// Can make the message a sibling of the header
// header.before(message);
// header.after(message);

// Delete elements before the remove element you had to select the parent then select the child
// Previously, before the remove() mehtod, message.parentElement.removeChild(message);
document.querySelector(".btn--close-cookie").addEventListener("click", (e) => {
  e.preventDefault();
  message.remove();
});

/////////////////////////
/////////////////////////
// Styles
message.style.backgroundColor = "#37383d";
message.style.width = "120%";

console.log(message.style.height); // only works for style properties that were set manually ourselves

console.log(getComputedStyle(message)); // returns all the properties and values
console.log(getComputedStyle(message).color); // returns the color
console.log(getComputedStyle(message).height); // returns the height

message.style.height =
  Number.parseFloat(getComputedStyle(message).height) + 30 + "px";
console.log(getComputedStyle(message).height); // returns the height

document.documentElement.style.setProperty("--color-primary", "orangered");

// Attributes
const logo = document.querySelector(".nav__logo");
console.log(logo.alt);
console.log(logo.src);
console.log(logo.className);

logo.alt = "Beautiful minimalist logo";

// Non-standard
console.log(logo.designer);
console.log(logo.getAttribute("designer"));
logo.setAttribute("company", "Bankist");
console.log(logo.getAttribute("company"));

console.log(logo.src); // absolute
console.log(logo.getAttribute("src")); // relative

const link = document.querySelector(".nav__link--btn");

console.log(link.href); // absolute
console.log(link.getAttribute("href")); // relative

// Data atrributes
console.log(logo.dataset.versionNumber); // need to use camelCase

// Classes
logo.classList.add("");
logo.classList.remove("");
logo.classList.toggle("");
logo.classList.contains("");

// Don't use, the following would override all classes
logo.className = "className";

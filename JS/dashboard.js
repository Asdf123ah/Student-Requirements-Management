// Check if user is logged in
let loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
const welcomeMessage = document.getElementById("welcomeMessage");
const homeLink = document.getElementById("home");
const primaryLink = document.getElementById("primary");
const secondaryLink = document.getElementById("secondary");
const teamLink = document.getElementById("teammember");
const aboutLink = document.getElementById("about");
const logoutLink = document.getElementById("logout");
const mainContent = document.getElementById("maincontent");

function updateLoginLogoutLink() {
  if (loggedInUser) {
    welcomeMessage.textContent = `Welcome, ${loggedInUser.firstName} ${loggedInUser.lastName}!`;
    logoutLink.innerHTML =
      "<i class='fas fa-circle-user'></i> <span>Logout</span>";
    logoutLink.removeEventListener("click", goToLogin);
    logoutLink.addEventListener("click", handleLogout);
  } else {
    welcomeMessage.textContent = "Welcome, Guest!";
    logoutLink.innerHTML =
      "<i class='fas fa-circle-user'></i> <span>Login/Signup</span>";
    logoutLink.removeEventListener("click", handleLogout);
    logoutLink.addEventListener("click", goToLogin);
  }
}

updateLoginLogoutLink();

homeLink.addEventListener("click", goToHome);
primaryLink.addEventListener("click", goToPrimary);
secondaryLink.addEventListener("click", goToSecondary);
teamLink.addEventListener("click", goToTeam);
aboutLink.addEventListener("click", goToAbout);
logoutLink.addEventListener("click", handleLogout);

function goToHome(event) {
  event.preventDefault();
  window.location.href = "dashboard.html";
}

function goToPrimary(event) {
  event.preventDefault();
  if (loggedInUser) {

    window.location.href = "try.html";
  } else {
    alert("Please login first.");
    window.location.href = "login.html";
  }
}

function goToSecondary(event) {
  event.preventDefault();
  if (loggedInUser) {
    window.location.href = "secondary.html";
    mainContent.innerHTML = "<h1>Secondary Page</h1>";
  } else {
    alert("Please login first.");
    window.location.href = "login.html";
  }
}

function goToTeam(event) {
  event.preventDefault();
  if (loggedInUser) {
    mainContent.innerHTML = "<h1>Team Member Page</h1>";
  } else {
    alert("Please login first.");
    window.location.href = "login.html";
  }
}

function goToAbout(event) {
  event.preventDefault();
  if (loggedInUser) {
    mainContent.innerHTML = "<h1>About Page</h1>";
  } else {
    alert("Please login first.");
    window.location.href = "login.html";
  }
}

function handleLogout(event) {
  event.preventDefault();
  localStorage.removeItem("loggedInUser");
  loggedInUser = null;
  updateLoginLogoutLink();
  window.location.href = "login.html";
}

function goToLogin(event) {
  event.preventDefault();
  window.location.href = "login.html";
}

function toggleSidebar() {
  const container = document.querySelector(".container");
  container.classList.toggle("minimized");
}

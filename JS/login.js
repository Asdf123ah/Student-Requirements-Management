// Get references to elements

const loginForm = document.getElementById("loginForm");
const signupForm = document.getElementById("signupForm");
const loginEmail = document.getElementById("loginEmail");
const loginPassword = document.getElementById("loginPassword");
const signupEmail = document.getElementById("signupEmail");
const signupPassword = document.getElementById("signupPassword");
const signupConfirmPassword = document.getElementById("signupConfirmPassword");
const signupFirstName = document.getElementById("signupFirstName");
const signupLastName = document.getElementById("signupLastName");
const signupStudentID = document.getElementById("signupStudentID");
const signupMonth = document.getElementById("signupMonth");
const signupDay = document.getElementById("signupDay");
const signupYear = document.getElementById("signupYear");

import { validateLoginForm } from "./validation.js";

function handleLogin(event) {
  event.preventDefault();

  const email = loginEmail.value;
  const password = loginPassword.value;
  const formData = {
    email,
    password,
  };
  const errorMessage = validateLoginForm(formData);
  if (errorMessage) {
    alert(errorMessage);
    return;
  }
}

import { validateSignupForm } from "./validation.js";

function handleSignup(event) {
  event.preventDefault();

  const email = signupEmail.value;
  const password = signupPassword.value;
  const confirmPassword = signupConfirmPassword.value;
  const firstName = signupFirstName.value;
  const lastName = signupLastName.value;
  const studentID = signupStudentID.value;
  const birthMonth = signupMonth.value;
  const birthDay = signupDay.value;
  const birthYear = signupYear.value;
  const formData = {
    email,
    password,
    confirmPassword,
    firstName,
    lastName,
    studentID,
    birthMonth,
    birthDay,
    birthYear,
    };
  const errorMessage = validateSignupForm(formData);
  if (errorMessage) {
    alert(errorMessage);
    return;
  }
  
  // Construct the birthdate
  const birthDate = `${birthYear}-${birthMonth}-${birthDay}`;

  // Calculate age
  const birthDateObj = new Date(birthDate);
  const today = new Date();
  let age = today.getFullYear() - birthDateObj.getFullYear();
  const monthDiff = today.getMonth() - birthDateObj.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDateObj.getDate())) {
    age--;
  }

  formData.age = age;

  const storedUsers = JSON.parse(localStorage.getItem("users")) || [];

  const newUser = {
    email,
    password,
    firstName,
    lastName,
    studentID,
    birthDate: age,
  };

  storedUsers.push(newUser);
  localStorage.setItem("users", JSON.stringify(storedUsers));

  alert("Signup successful! You can now log in.");
  window.switchToLogin();
}

loginForm.addEventListener("submit", handleLogin);
signupForm.addEventListener("submit", handleSignup);

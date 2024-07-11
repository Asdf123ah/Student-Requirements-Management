// toggleForms.js
document.addEventListener("DOMContentLoaded", () => {
  const loginContainer = document.getElementById("loginContainer");
  const signupContainer = document.getElementById("signupContainer");
  const toggleToSignup = document.getElementById("toggleToSignup");
  const toggleToLogin = document.getElementById("toggleToLogin");

  function switchToSignup() {
    loginContainer.style.display = "none";
    signupContainer.style.display = "block";
  }

  function switchToLogin() {
    signupContainer.style.display = "none";
    loginContainer.style.display = "block";
  }

  toggleToSignup.addEventListener("click", switchToSignup);
  toggleToLogin.addEventListener("click", switchToLogin);

  // Export the functions to be used in other modules
  window.switchToSignup = switchToSignup;
  window.switchToLogin = switchToLogin;
});

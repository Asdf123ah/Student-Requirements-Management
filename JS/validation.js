// Login validation
export function validateLoginForm(formData) {
  if (!formData.email && !formData.password) {
    alert("Please enter your email and password.");
    return;
  } else if (!formData.email) {
    alert("Please enter your email.");
    return;
  } else if (!formData.password) {
    alert("Please enter your password.");
    return;
  }

  const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
  const user = storedUsers.find((u) => u.email === formData.email);

  if (user && user.password === formData.password) {
    alert("Login successful!");
    localStorage.setItem("loggedInUser", JSON.stringify(user));
    window.location.href = "dashboard.html";
  } else {
    alert("Invalid email or password.");
  }

  return null;
}

// Sign-up validation
export function validateSignupForm(formData) {
  const requiredFields = {
    email: "email",
    password: "password",
    confirmPassword: "confirm password",
    firstName: "first name",
    lastName: "last name",
    studentID: "student ID",
    birthMonth: "birth month",
    birthDay: "birth day",
    birthYear: "birth year",
  };

  const emptyFields = [];
  for (const field in requiredFields) {
    if (!formData[field]) {
      emptyFields.push(requiredFields[field]);
    }
  }

  if (emptyFields.length > 0) {
    const fieldsString = emptyFields.join(", ");
    return `Please enter your ${fieldsString}.`;
  }

  if (formData.password !== formData.confirmPassword) {
    return "Passwords do not match.";
  }

  const storedUsers = JSON.parse(localStorage.getItem("users")) || [];

  if (storedUsers.some((u) => u.email === formData.email)) {
    return "Email already registered.";
  }

  return null;
}

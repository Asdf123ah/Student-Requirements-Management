document.getElementById("continueBtn").addEventListener("click", function () {
    const emailInput = document.querySelector("input[placeholder='Email']").value.trim(); // Trim whitespace
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const userExists = users.some(user => user.email === emailInput);
    const errorMessage = document.getElementById("error-message");

    errorMessage.textContent = "";

    if (!errorMessage) {
        const errorMessageDiv = document.createElement("div");
        errorMessageDiv.id = "error-message";
        errorMessageDiv.className = "error-message";
        document.getElementById("step1").appendChild(errorMessageDiv);
    }

    if (!emailInput) {
        errorMessage.textContent = "Please enter your email.";
    } else if (userExists) {
        document.getElementById("step1").classList.remove("active");
        document.getElementById("step2").classList.add("active");
    } else {
        errorMessage.textContent = "Email does not exist. Please try again.";
    }
});


document.querySelector("button[placeholder='Reset Password']").addEventListener("click", function () {
    const newPasswordInput = document.querySelector("input[placeholder='New password']").value.trim();
    const confirmPasswordInput = document.querySelector("input[placeholder='Confirm password']").value.trim();
    const errorMessageStep2 = document.getElementById("error-message2");
    const errorMessageStep3 = document.getElementById("error-message3");

    // Clear previous error messages
    errorMessageStep2.textContent = "";

    if (!errorMessageStep2) {
        const errorMessageDivStep2 = document.createElement("div");
        errorMessageDivStep2.id = "error-message2";
        errorMessageDivStep2.className = "error-message2";
        document.getElementById("step2").appendChild(errorMessageDivStep2);
    }

    if (!newPasswordInput || !confirmPasswordInput) {
        // If any input field is empty, display error message
        errorMessageStep2.textContent = "Please enter your new password.";
    } else if (newPasswordInput !== confirmPasswordInput) {
        errorMessageStep2.textContent = "Passwords do not match. Please try again.";
    } else {
        // Update password in localStorage
        const emailInput = document.querySelector("input[placeholder='Email']").value.trim();
        const users = JSON.parse(localStorage.getItem("users")) || [];
        const updatedUsers = users.map(user => {
            if (user.email === emailInput) {
                user.password = newPasswordInput;
            }
            return user;
        });
        localStorage.setItem("users", JSON.stringify(updatedUsers));
        
        // Success message
        const errorMessageDivStep2 = document.createElement("div");
        errorMessageDivStep2.id = "error-message3";
        errorMessageDivStep2.className = "success-message"; // Corrected the class assignment
        errorMessageStep3.textContent = "Password successfully updated. You can now log in.";
        setTimeout(function () {
            // Redirect to login page after 3 seconds
            window.location.href = "login.html";
        }, 3000);
    }
});


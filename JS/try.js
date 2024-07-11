document.addEventListener("DOMContentLoaded", () => {
  
  // Sample data (removed for brevity)

  // Retrieve requirements from local storage
  let requirements = JSON.parse(localStorage.getItem("requirements")) || [];

  // Retrieve teachers and students from local storage
  let teachers = JSON.parse(localStorage.getItem("teachers")) || [];
  let students = JSON.parse(localStorage.getItem("students")) || [];

  let grades = {
    student1: {
      "Math Homework": 9,
      "Science Quiz": "-",
      "Group Project": 25,
    },
    student2: {
      "Math Homework": 8,
      "Science Quiz": 18,
      "Group Project": "-",
    },
    student3: {
      "Math Homework": "-",
      "Science Quiz": 20,
      "Group Project": 30,
    },
  };

  function showTab(tabName) {
    document.querySelectorAll(".tab-content").forEach((tab) => {
      tab.style.display = "none";
    });
    document.getElementById(tabName).style.display = "block";

    switch (tabName) {
      case "stream":
        updateStream();
        break;
      case "classwork":
        updateClasswork();
        break;
      case "people":
        updatePeople();
        break;
      case "grades":
        updateGradesTable();
        break;
    }
  }

  document.querySelectorAll(".tab-button").forEach((tabButton) => {
    tabButton.addEventListener("click", () => {
      const tabName = tabButton.dataset.tab;
      showTab(tabName);
    });
  });

  // Modal
  const modal = document.getElementById("requirement-modal");
  const btn = document.getElementById("create-requirement-btn");
  const span = document.getElementsByClassName("close")[0];

  btn.onclick = function () {
    modal.style.display = "block";
  };

  span.onclick = function () {
    modal.style.display = "none";
  };

  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };

  // Form submission
  document
    .getElementById("requirement-form")
    .addEventListener("submit", (e) => {
      e.preventDefault();
      const form = e.target;
      const newRequirement = {
        type: form["req-type"].value,
        title: form["title"].value,
        instructions: form["instructions"].value,
        whoToSend: Array.from(form["who-to-send"].selectedOptions).map(
          (option) => option.value
        ),
        points: form["points"].value,
        dueDate: form["due-date"].value,
        topic: form["topic"].value,
        collaborativeTask: form["collaborative-task"].value,
        attachments: form["attachments"].value,
      };
      addRequirement(newRequirement);
      form.reset();
      modal.style.display = "none";
    });

  function addRequirement(requirement) {
    requirements.push(requirement);
    localStorage.setItem("requirements", JSON.stringify(requirements));
    updateStream();
    updateClasswork();
  }

  function updateStream() {
    const streamList = document.getElementById("stream-list");
    streamList.innerHTML = "";
    requirements.sort((a, b) => new Date(b.dueDate) - new Date(a.dueDate));
    requirements.forEach((req) => {
      const div = document.createElement("div");
      div.innerHTML = `<strong>${req.type}</strong>: ${req.title} - Due: ${req.dueDate} <button class="edit-btn" data-title="${req.title}">Edit</button> <button class="delete-btn" data-title="${req.title}">Delete</button>`;
      streamList.appendChild(div);
    });
    attachEditDeleteListeners();
  }

  function updateClasswork() {
    const classworkList = document.getElementById("classwork-list");
    classworkList.innerHTML = "";
    requirements.sort((a, b) => new Date(b.dueDate) - new Date(a.dueDate));
    requirements.forEach((req) => {
      const div = document.createElement("div");
      div.innerHTML = `${req.title} - Created: ${
        new Date().toISOString().split("T")[0]
      } <button class="edit-btn" data-title="${
        req.title
      }">Edit</button> <button class="delete-btn" data-title="${
        req.title
      }">Delete</button>`;
      classworkList.appendChild(div);
    });
    attachEditDeleteListeners();
  }

  function attachEditDeleteListeners() {
    document.querySelectorAll(".edit-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        const title = btn.dataset.title;
        editRequirement(title);
      });
    });

    document.querySelectorAll(".delete-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        const title = btn.dataset.title;
        deleteRequirement(title);
      });
    });
  }

  function editRequirement(title) {
    const req = requirements.find((r) => r.title === title);
    if (req) {
      const form = document.getElementById("requirement-form");
      form["req-type"].value = req.type;
      form["title"].value = req.title;
      form["instructions"].value = req.instructions;
      form["who-to-send"].value = req.whoToSend;
      form["points"].value = req.points;
      form["due-date"].value = req.dueDate;
      form["topic"].value = req.topic;
      form["collaborative-task"].value = req.collaborativeTask;
      form["attachments"].value = req.attachments;
      modal.style.display = "block";

      // Remove the requirement being edited
      deleteRequirement(title);
    }
  }

  function deleteRequirement(title) {
    requirements = requirements.filter((r) => r.title !== title);
    localStorage.setItem("requirements", JSON.stringify(requirements));
    updateStream();
    updateClasswork();
  }

  function addTeacher() {
    const newTeacher = document.getElementById("new-teacher").value;
    if (newTeacher) {
      teachers.push(newTeacher);
      updatePeople();
    }
  }

  function addStudent() {
    const newStudent = document.getElementById("new-student").value;
    if (newStudent) {
      students.push(newStudent);
      updatePeople();
    }
  }

  // Function to update people tab
  function updatePeople() {
    const teacherList = document.getElementById("teacher-list");
    teacherList.innerHTML = "";
    teachers.forEach((teacher) => {
      const li = document.createElement("li");
      li.textContent = teacher;
      const removeButton = document.createElement("button");
      removeButton.textContent = "Remove";
      removeButton.addEventListener("click", () => {
        teachers = teachers.filter((t) => t !== teacher);
        updatePeople();
        // Store updated teachers list in local storage
        localStorage.setItem("teachers", JSON.stringify(teachers));
      });
      li.appendChild(removeButton);
      teacherList.appendChild(li);
    });

    const studentList = document.getElementById("student-list");
    studentList.innerHTML = "";
    students.forEach((student) => {
      const li = document.createElement("li");
      li.textContent = student;
      const removeButton = document.createElement("button");
      removeButton.textContent = "Remove";
      removeButton.addEventListener("click", () => {
        students = students.filter((s) => s !== student);
        updatePeople();
        // Store updated students list in local storage
        localStorage.setItem("students", JSON.stringify(students));
      });
      li.appendChild(removeButton);
      studentList.appendChild(li);
    });
  }

  // Add teacher
  document
    .getElementById("add-teacher-button")
    .addEventListener("click", () => {
      const newTeacher = document.getElementById("new-teacher").value;
      if (newTeacher) {
        teachers.push(newTeacher);
        updatePeople();
        // Store updated teachers list in local storage
        localStorage.setItem("teachers", JSON.stringify(teachers));
        document.getElementById("new-teacher").value = "";
      }
    });

  // Add student
  document
    .getElementById("add-student-button")
    .addEventListener("click", () => {
      const newStudent = document.getElementById("new-student").value;
      if (newStudent) {
        students.push(newStudent);
        updatePeople();
        // Store updated students list in local storage
        localStorage.setItem("students", JSON.stringify(students));
        document.getElementById("new-student").value = "";
      }
    });

  function updateGradesTable() {
    const table = document.getElementById("grades-table");
    const thead = table.querySelector("thead");
    const tbody = table.querySelector("tbody");

    // Clear previous data
    thead.innerHTML = "<tr><th>Student Name</th></tr>";
    tbody.innerHTML = "";

    // Update table header with requirement titles
    requirements.forEach((req) => {
      const th = document.createElement("th");
      th.textContent = req.title + " - Due: " + req.dueDate;
      thead.firstChild.appendChild(th);
    });

    // Update table body with student names and grades
    Object.entries(grades).forEach(([student, studentGrades]) => {
      const tr = document.createElement("tr");
      const td = document.createElement("td");
      td.textContent = student;
      tr.appendChild(td);

      requirements.forEach((req) => {
        const td = document.createElement("td");
        const grade = studentGrades[req.title] || "-";
        td.textContent = grade;
        tr.appendChild(td);
      });

      tbody.appendChild(tr);
    });
  }

  // Initial rendering
  showTab("stream");


  
});

// Check if user is logged in
let loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
const welcomeMessage = document.getElementById("welcomeMessage");
const logoutLink = document.getElementById("logout");
const homeLink = document.getElementById("home");
const primaryLink = document.getElementById("primary");
const secondaryLink = document.getElementById("secondary");
const teamLink = document.getElementById("teammember");
const aboutLink = document.getElementById("about");
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
    mainContent.innerHTML = "<h1>Primary Page</h1>";
  } else {
    alert("Please login first.");
    window.location.href = "login.html";
  }
}

function goToSecondary(event) {
  event.preventDefault();
  if (loggedInUser) {
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
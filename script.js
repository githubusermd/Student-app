let selectedRole = null;

// When user selects role
function selectRole(role) {
  selectedRole = role;
  document.getElementById("loginForm").classList.remove("hidden");
}

// Show/Hide password
function togglePassword(fieldId) {
  const input = document.getElementById(fieldId);
  input.type = input.type === "password" ? "text" : "password";
}

// Handle login form submit
document.getElementById("loginForm")?.addEventListener("submit", function (e) {
  e.preventDefault();

  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;
  const users = JSON.parse(localStorage.getItem("users")) || [];

  const user = users.find(u => u.email === email && u.password === password && u.type === selectedRole);

  if (!user) {
    alert("Invalid email, password, or role.");
    return;
  }

  localStorage.setItem("loggedInUser", JSON.stringify(user));

  if (selectedRole === "student") {
    window.location.href = "student-dashboard.html";
  } else if (selectedRole === "teacher") {
    window.location.href = "teacher-dashboard.html";
  }
});

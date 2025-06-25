function showForm() {
    const type = document.getElementById("userType").value;
    document.getElementById("studentForm").style.display = type === "student" ? "block" : "none";
    document.getElementById("teacherForm").style.display = type === "teacher" ? "block" : "none";
  }
  
  // 🔽 Handle Student Registration
  document.getElementById("studentRegisterForm")?.addEventListener("submit", function (e) {
    e.preventDefault();
    const photo = document.getElementById("studentPhoto").files[0];
    const reader = new FileReader();
  
    reader.onload = function () {
      const newStudent = {
        type: "student",
        photo: reader.result,
        name: document.getElementById("studentName").value,
        email: document.getElementById("studentEmail").value,
        dept: document.getElementById("studentDept").value,
        roll: document.getElementById("studentRoll").value,
        phone: document.getElementById("studentPhone").value,
        semester: document.getElementById("studentSemester").value,
        shift: document.getElementById("studentShift").value,
        password: document.getElementById("studentPassword").value
      };
  
      if (newStudent.password !== document.getElementById("studentConfirmPassword").value) {
        alert("Passwords do not match!");
        return;
      }
  
      const users = JSON.parse(localStorage.getItem("users")) || [];
      users.push(newStudent);
      localStorage.setItem("users", JSON.stringify(users));
      alert("Student registered successfully!");
      window.location.href = "index.html";
    };
  
    reader.readAsDataURL(photo);
  });
  
  // 🔽 Handle Teacher Registration
  document.getElementById("teacherRegisterForm")?.addEventListener("submit", function (e) {
    e.preventDefault();
    const photo = document.getElementById("teacherPhoto").files[0];
    const reader = new FileReader();
  
    reader.onload = function () {
      const newTeacher = {
        type: "teacher",
        photo: reader.result,
        email: document.getElementById("teacherEmail").value,
        phone: document.getElementById("teacherPhone").value,
        password: document.getElementById("teacherPassword").value
      };
  
      if (newTeacher.password !== document.getElementById("teacherConfirmPassword").value) {
        alert("Passwords do not match!");
        return;
      }
  
      const users = JSON.parse(localStorage.getItem("users")) || [];
      users.push(newTeacher);
      localStorage.setItem("users", JSON.stringify(users));
      alert("Teacher registered successfully!");
      window.location.href = "index.html";
    };
  
    reader.readAsDataURL(photo);
  });
  // 🔐 Handle Login
document.getElementById("loginForm")?.addEventListener("submit", function (e) {
    e.preventDefault();
  
    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;
  
    const users = JSON.parse(localStorage.getItem("users")) || [];
  
    const user = users.find(u => u.email === email && u.password === password);
  
    if (!user) {
      alert("Invalid email or password!");
      return;
    }
  
    // Store logged-in user temporarily
    localStorage.setItem("loggedInUser", JSON.stringify(user));
  
    // Redirect based on role
    if (user.type === "student") {
      window.location.href = "student-dashboard.html";
    } else if (user.type === "teacher") {
      window.location.href = "teacher-dashboard.html";
    } else {
      alert("Unknown user type!");
    }
  });
  function togglePassword(fieldId) {
    const input = document.getElementById(fieldId);
    if (input.type === "password") {
      input.type = "text";
    } else {
      input.type = "password";
    }
  }
  
  // 📦 Show Student Profile
if (window.location.pathname.includes("student-dashboard.html")) {
    const user = JSON.parse(localStorage.getItem("loggedInUser"));
  
    if (!user || user.type !== "student") {
      alert("Access denied. Please login as a student.");
      window.location.href = "index.html";
    } else {
      document.getElementById("studentPhoto").src = user.photo;
      document.getElementById("studentName").textContent = user.name;
      document.getElementById("studentEmail").textContent = user.email;
      document.getElementById("studentDept").textContent = user.dept;
      document.getElementById("studentRoll").textContent = user.roll;
      document.getElementById("studentPhone").textContent = user.phone;
      document.getElementById("studentSemester").textContent = user.semester;
      document.getElementById("studentShift").textContent = user.shift;
    }
  }
  
  // 🔚 Logout Function
  function logout() {
    localStorage.removeItem("loggedInUser");
    window.location.href = "index.html";
  }
// 🧑‍🏫 Load Teacher Dashboard
if (window.location.pathname.includes("teacher-dashboard.html")) {
    const teacher = JSON.parse(localStorage.getItem("loggedInUser"));
    if (!teacher || teacher.type !== "teacher") {
      alert("Access denied. Please login as a teacher.");
      window.location.href = "index.html";
    }
  }
  
  function searchStudent() {
    const roll = document.getElementById("searchRoll").value.trim();
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const student = users.find(u => u.type === "student" && u.roll === roll);
  
    if (!student) {
      alert("Student not found.");
      document.getElementById("studentResult").style.display = "none";
      return;
    }
  
    document.getElementById("studentPhoto").src = student.photo;
    document.getElementById("studentName").textContent = student.name;
    document.getElementById("studentEmail").textContent = student.email;
    document.getElementById("studentDept").textContent = student.dept;
    document.getElementById("studentSemester").textContent = student.semester;
    document.getElementById("studentShift").textContent = student.shift;
  
    document.getElementById("studentAttendance").value = student.attendance || "";
    document.getElementById("studentResultData").value = student.result || "";
  
    // Store found student for updating
    localStorage.setItem("editingStudentRoll", student.roll);
    document.getElementById("studentResult").style.display = "block";
  }
  
  function updateStudent() {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const roll = localStorage.getItem("editingStudentRoll");
  
    const index = users.findIndex(u => u.type === "student" && u.roll === roll);
    if (index === -1) return alert("Could not find student to update.");
  
    users[index].attendance = document.getElementById("studentAttendance").value;
    users[index].result = document.getElementById("studentResultData").value;
  
    localStorage.setItem("users", JSON.stringify(users));
    alert("Student data updated.");
  }
    
  
  
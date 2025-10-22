// ==================== REGISTER ====================
const registerForm = document.getElementById("registerForm");
if (registerForm) {
  registerForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const fullname = document.getElementById("fullname").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const errorMsg = document.getElementById("errorMsg");

    // Ambil data user yang sudah ada
    let users = JSON.parse(localStorage.getItem("users")) || [];

    // Cek apakah email sudah terdaftar
    const userExist = users.find((u) => u.email === email);
    if (userExist) {
      errorMsg.textContent = "Email sudah terdaftar. Gunakan email lain!";
      return;
    }

    // Simpan user baru
    users.push({ fullname, email, password });
    localStorage.setItem("users", JSON.stringify(users));

    alert("Registrasi berhasil! Silakan login.");
    window.location.href = "index.html";
  });
}

// ==================== LOGIN ====================
const loginForm = document.getElementById("loginForm");
if (loginForm) {
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const errorMsg = document.getElementById("errorMsg");

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const user = users.find(
      (u) => u.email === email && u.password === password
    );

    if (user) {
      localStorage.setItem("loggedInUser", JSON.stringify(user));
      window.location.href = "home.html";
    } else {
      errorMsg.textContent = "Email atau kata sandi salah!";
    }
  });
}

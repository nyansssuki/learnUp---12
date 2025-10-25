// ==================== REGISTER ====================
const registerForm = document.getElementById("registerForm");
if (registerForm) {
  registerForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const fullname = document.getElementById("fullname").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const errorMsg = document.getElementById("errorMsg");

    if (!fullname || !email || !password) {
      errorMsg.textContent = "Semua kolom wajib diisi!";
      return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || [];

    const userExist = users.find((u) => u.email === email);
    if (userExist) {
      errorMsg.textContent = "Email sudah terdaftar. Gunakan email lain!";
      return;
    }

    users.push({ fullname, email, password, progress: 0 });
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
      // Simpan data user yang sedang login
      localStorage.setItem("loggedInUser", JSON.stringify(user));
      // Arahkan langsung ke dashboard
      window.location.href = "dashboard.html";
    } else {
      errorMsg.textContent = "Email atau kata sandi salah!";
    }
  });
}

// ==================== DASHBOARD ====================
if (window.location.pathname.includes("dashboard.html")) {
  const user = JSON.parse(localStorage.getItem("loggedInUser"));

  if (!user) {
    // Jika belum login, arahkan ke login page
    window.location.href = "index.html";
  } else {
    // Tampilkan nama pengguna di dashboard
    document.getElementById("username").textContent = user.fullname;

    // Tampilkan progress
    const progressBar = document.getElementById("progress-bar");
    const progressText = document.getElementById("progress-text");

    progressBar.style.width = user.progress + "%";
    progressText.textContent = user.progress + "%";

    // Simulasi: Tambah progress saat user klik tombol "Kerjakan Soal"
    const btnProgress = document.getElementById("addProgress");
    btnProgress.addEventListener("click", () => {
      let users = JSON.parse(localStorage.getItem("users")) || [];
      const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

      const index = users.findIndex((u) => u.email === loggedInUser.email);
      if (index !== -1 && users[index].progress < 100) {
        users[index].progress += 10;
        if (users[index].progress > 100) users[index].progress = 100;

        localStorage.setItem("users", JSON.stringify(users));
        localStorage.setItem("loggedInUser", JSON.stringify(users[index]));

        progressBar.style.width = users[index].progress + "%";
        progressText.textContent = users[index].progress + "%";
      }
    });
  }
}

// ==================== LOGOUT ====================
const logoutBtn = document.getElementById("logoutBtn");
if (logoutBtn) {
  logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("loggedInUser");
    window.location.href = "index.html";
  });
}

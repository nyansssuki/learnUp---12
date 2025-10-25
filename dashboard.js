// ===== CEK LOGIN =====
const currentUser = JSON.parse(localStorage.getItem("loggedInUser"));
if (!currentUser) {
  window.location.href = "index.html";
}

// ===== TAMPILKAN PROFIL DI HEADER =====
document.getElementById("userName").textContent = currentUser.fullname;
document.getElementById("userEmail").textContent = currentUser.email;

// ===== DROPDOWN LOGOUT =====
const profilePic = document.getElementById("profilePic");
const dropdownMenu = document.getElementById("dropdownMenu");

profilePic.addEventListener("click", () => {
  dropdownMenu.style.display =
    dropdownMenu.style.display === "block" ? "none" : "block";
});

// Tutup dropdown saat klik di luar
window.addEventListener("click", (e) => {
  if (!e.target.closest(".profile-dropdown")) {
    dropdownMenu.style.display = "none";
  }
});

// ===== LOGOUT =====
document.getElementById("logoutBtn").addEventListener("click", () => {
  localStorage.removeItem("loggedInUser");
  window.location.href = "index.html";
});

// ===== PROGRESS BELAJAR =====
let progress = parseInt(localStorage.getItem(`progress_${currentUser.email}`)) || 0;
const progressText = document.getElementById("progressText");
const progressFill = document.getElementById("progressFill");

function updateProgressBar() {
  progressFill.style.width = `${progress}%`;
  progressText.textContent = `${progress}% dari total modul selesai`;
}
updateProgressBar();

// ===== MODUL BUTTON =====
const moduleButtons = document.querySelectorAll(".module-btn");
moduleButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    if (progress < 100) {
      progress += 33;
      if (progress > 100) progress = 100;
      localStorage.setItem(`progress_${currentUser.email}`, progress);
      updateProgressBar();
      alert("Modul sedang dikembangkan. Progress kamu bertambah!");
    }
  });
});

// ===== PENGINGAT BELAJAR (10 menit) =====
setInterval(() => {
  alert("📚 Ayo belajar lagi! Waktunya lanjutkan progresmu 💪");
}, 10 * 60 * 1000);

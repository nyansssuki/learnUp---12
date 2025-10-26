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

window.addEventListener("click", (e) => {
  if (!e.target.closest(".profile-dropdown")) {
    dropdownMenu.style.display = "none";
  }
});

document.getElementById("logoutBtn").addEventListener("click", () => {
  localStorage.removeItem("loggedInUser");
  window.location.href = "index.html";
});

// ===== FORUM FUNCTION =====
const postBtn = document.getElementById("postBtn");
const newPost = document.getElementById("newPost");
const forumPosts = document.getElementById("forumPosts");

let posts = JSON.parse(localStorage.getItem("forumPosts")) || [];

function renderPosts() {
  forumPosts.innerHTML = "";
  if (posts.length === 0) {
    forumPosts.innerHTML =
      "<p class='no-post'>Belum ada diskusi. Jadilah yang pertama!</p>";
    return;
  }

  posts.forEach((post, index) => {
    const postEl = document.createElement("div");
    postEl.classList.add("forum-post");

    // Struktur utama post
    postEl.innerHTML = `
      <div class="post-header">
        <strong>${post.user}</strong>
        <span>${post.email}</span>
        <p class="post-time">${new Date(post.time).toLocaleString()}</p>
      </div>
      <p class="post-content">${post.text}</p>
      <button class="reply-btn" data-index="${index}">Balas</button>
      <div class="reply-section" id="replySection-${index}"></div>
    `;

    // Tampilkan semua balasan (jika ada)
    const replySection = postEl.querySelector(`#replySection-${index}`);
    if (post.replies && post.replies.length > 0) {
      post.replies.forEach((reply) => {
        const replyEl = document.createElement("div");
        replyEl.classList.add("reply");
        replyEl.innerHTML = `
          <div class="reply-header">
            <strong>${reply.user}</strong>
            <span>${reply.email}</span>
            <p class="reply-time">${new Date(reply.time).toLocaleString()}</p>
          </div>
          <p class="reply-content">${reply.text}</p>
        `;
        replySection.appendChild(replyEl);
      });
    }

    forumPosts.prepend(postEl);
  });

  // Event listener tombol balas
  document.querySelectorAll(".reply-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const index = e.target.getAttribute("data-index");
      showReplyInput(index);
    });
  });
}

// Tampilkan kolom balas di bawah post
function showReplyInput(index) {
  const replySection = document.getElementById(`replySection-${index}`);
  replySection.innerHTML = `
    <textarea id="replyText-${index}" class="reply-input" placeholder="Tulis balasanmu di sini..."></textarea>
    <button class="send-reply-btn" data-index="${index}">Kirim Balasan</button>
  `;

  document
    .querySelector(`#replySection-${index} .send-reply-btn`)
    .addEventListener("click", (e) => {
      const idx = e.target.getAttribute("data-index");
      const replyText = document
        .getElementById(`replyText-${idx}`)
        .value.trim();
      if (!replyText) return alert("Tuliskan balasan terlebih dahulu!");

      const newReply = {
        user: currentUser.fullname,
        email: currentUser.email,
        text: replyText,
        time: new Date().toISOString(),
      };

      if (!posts[idx].replies) posts[idx].replies = [];
      posts[idx].replies.push(newReply);
      localStorage.setItem("forumPosts", JSON.stringify(posts));
      renderPosts();
    });
}

postBtn.addEventListener("click", () => {
  const text = newPost.value.trim();
  if (!text) return alert("Tulis sesuatu dulu!");

  const newEntry = {
    user: currentUser.fullname,
    email: currentUser.email,
    text,
    time: new Date().toISOString(),
    replies: [],
  };

  posts.push(newEntry);
  localStorage.setItem("forumPosts", JSON.stringify(posts));
  newPost.value = "";
  renderPosts();
});

renderPosts();

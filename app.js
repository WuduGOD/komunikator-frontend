document.getElementById("send-message").addEventListener("click", function() {
    const user = document.getElementById("user").value;
    const message = document.getElementById("message").value;

    if (!user || !message) {
        alert("Proszę podać imię i wiadomość!");
        return;
    }

    // Dodaj wiadomość do chat-box
    addMessageToChat(user, message);
    
    // Wyczyść formularz po wysłaniu
    document.getElementById("message").value = '';
});

const API_BASE = "https://komunikator-backend.onrender.com"; // Twój backend
const token = localStorage.getItem("access_token");

// przykładowe użycie:
fetch(`${API_BASE}/register`, { /* ... */ });


// Funkcja do dodawania wiadomości do czatu
function addMessageToChat(user, message) {
    const chatBox = document.getElementById("chat-box");
    const newMessage = document.createElement("div");
    newMessage.classList.add("message");
    newMessage.innerHTML = `<strong>${user}:</strong> ${message}`;
    chatBox.appendChild(newMessage);

    // Scrollowanie na dół po dodaniu wiadomości
    chatBox.scrollTop = chatBox.scrollHeight;
}

// Obsługa rejestracji
const registerForm = document.getElementById("register-form");
if (registerForm) {
  registerForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    const username = document.getElementById("reg-username").value;
    const password = document.getElementById("reg-password").value;

    try {
      const res = await fetch(`${API_BASE}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (res.ok) {
        alert("Rejestracja zakończona sukcesem. Możesz się teraz zalogować.");
        // opcjonalnie: automatyczne przełączenie na formularz logowania
        document.getElementById("register-container").style.display = "none";
        document.getElementById("login-container").style.display = "block";
      } else {
        const data = await res.json();
        alert(data.detail || "Błąd rejestracji");
      }
    } catch (err) {
      console.error(err);
      alert("Wystąpił błąd sieci");
    }
  });
}

// Obsługa logowania
const loginForm = document.getElementById("login-form");
if (loginForm) {
  loginForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    try {
      const res = await fetch(`${API_BASE}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({ username, password })
      });

      const data = await res.json();

      if (res.ok && data.access_token) {
        localStorage.setItem("access_token", data.access_token);
        window.location.href = "friends.html"; // lub inna strona po zalogowaniu
      } else {
        alert(data.detail || "Nieprawidłowe dane logowania");
      }
    } catch (err) {
      console.error(err);
      alert("Wystąpił błąd logowania");
    }
  });
}

const showRegisterLink = document.getElementById("show-register");
if (showRegisterLink) {
  showRegisterLink.addEventListener("click", function (e) {
    e.preventDefault();
    document.getElementById("login-container").style.display = "none";
    document.getElementById("register-container").style.display = "block";
  });
}

const showLoginLink = document.getElementById("show-login");
if (showLoginLink) {
  showLoginLink.addEventListener("click", function (e) {
    e.preventDefault();
    document.getElementById("register-container").style.display = "none";
    document.getElementById("login-container").style.display = "block";
  });
}

// Funkcja dodająca znajomego
async function addFriend(friendId) {
  const res = await fetch(`${API_BASE}/friends`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify({ friend_id: friendId })
  });
  if (!res.ok) {
    const err = await res.json();
    alert(err.detail || "Błąd dodawania znajomego");
  } else {
    loadFriends();
  }
}

// Funkcja ładująca listę znajomych
async function loadFriends() {
  const res = await fetch(`${API_BASE}/friends`, {
    headers: { "Authorization": `Bearer ${token}` }
  });
  if (res.ok) {
    const friends = await res.json();
    const list = document.getElementById("friends-list");
    list.innerHTML = "";  // wyczyść stare wpisy
    friends.forEach(u => {
      const li = document.createElement("li");
      li.textContent = `${u.username} (ID: ${u.id})`;
      list.appendChild(li);
    });
  } else {
    console.error("Nie udało się pobrać znajomych");
  }
}

// Obsługa formularza na stronie friends.html
const form = document.getElementById("add-friend-form");
if (form) {
  form.addEventListener("submit", e => {
    e.preventDefault();
    const friendId = document.getElementById("friend-id").value;
    addFriend(friendId);
    form.reset();
  });

  // Naładowanie listy przy wejściu
  document.addEventListener("DOMContentLoaded", loadFriends);
}

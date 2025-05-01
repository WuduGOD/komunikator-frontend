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

const API_BASE = "https://komunikator-backend.onrender.com";  // podmień na rzeczywisty URL z Rendera

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

// Upewnij się, że masz gdzie trzymać token, np. po zalogowaniu:
// localStorage.setItem("access_token", token);

const API_BASE = "https://komunikator-backend.onrender.com"; // Twój backend
const token = localStorage.getItem("access_token");

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

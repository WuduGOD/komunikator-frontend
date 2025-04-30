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

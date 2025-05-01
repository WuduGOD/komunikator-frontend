// app.js
const API_BASE = "https://komunikator-backend.onrender.com";

// Poczekaj aż załaduje się DOM
document.addEventListener("DOMContentLoaded", () => {
  // Przełączanie widoku formularzy
  const showRegister = document.getElementById("show-register");
  const showLogin    = document.getElementById("show-login");

  showRegister?.addEventListener("click", e => {
    e.preventDefault();
    document.getElementById("login-container").style.display    = "none";
    document.getElementById("register-container").style.display = "block";
  });

  showLogin?.addEventListener("click", e => {
    e.preventDefault();
    document.getElementById("register-container").style.display = "none";
    document.getElementById("login-container").style.display    = "block";
  });

  // Obsługa logowania
  const loginForm = document.getElementById("login-form");
  loginForm?.addEventListener("submit", async e => {
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

      if (!res.ok) {
        alert(data.detail || "Błąd logowania");
        return;
      }
      localStorage.setItem("access_token", data.access_token);
      alert("Zalogowano pomyślnie!");
      window.location.href = "friends.html";
    } catch {
      alert("Wystąpił błąd sieci przy logowaniu");
    }
  });

  // Obsługa rejestracji
  const registerForm = document.getElementById("register-form");
  registerForm?.addEventListener("submit", async e => {
    e.preventDefault();
    const username = document.getElementById("reg-username").value;
    const password = document.getElementById("reg-password").value;

    try {
      const res = await fetch(`${API_BASE}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
      });
      if (!res.ok) {
        const err = await res.json();
        alert(err.detail || "Błąd rejestracji");
        return;
      }
      alert("Rejestracja udana! Zaloguj się.");
      // wróć do formularza logowania
      document.getElementById("register-container").style.display = "none";
      document.getElementById("login-container").style.display    = "block";
    } catch {
      alert("Wystąpił błąd sieci przy rejestracji");
    }
  });
});

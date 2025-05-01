// app.js - Obsługa logowania i rejestracji
const API_BASE = "https://komunikator-backend.onrender.com";

document.addEventListener("DOMContentLoaded", () => {
  // --- Logowanie (index.html) ---
  const loginForm = document.getElementById("login-form");
  if (loginForm) {
    loginForm.addEventListener("submit", async e => {
      e.preventDefault();
      const username = document.getElementById("username").value.trim();
      const password = document.getElementById("password").value;
      if (!username || !password) {
        alert("Proszę podać nazwę użytkownika i hasło");
        return;
      }
      try {
        const res = await fetch(`${API_BASE}/login`, {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: new URLSearchParams({ username, password })
        });
        const data = await res.json();
        if (!res.ok) {
          let msg = data.detail;
          if (Array.isArray(data.detail)) {
            msg = data.detail.map(item => item.msg || JSON.stringify(item)).join("\n");
          } else if (typeof data.detail === 'object') {
            msg = JSON.stringify(data.detail);
          }
          alert(msg || "Błąd logowania");
          return;
        }
        localStorage.setItem("access_token", data.access_token);
        alert("Zalogowano pomyślnie!");
        window.location.href = "friends.html";
      } catch (err) {
        console.error(err);
        alert("Wystąpił błąd sieci przy logowaniu");
      }
    });
  }

  // --- Rejestracja (register.html) ---
  const registerForm = document.getElementById("register-form");
  if (registerForm) {
    registerForm.addEventListener("submit", async e => {
      e.preventDefault();
      const username = document.getElementById("reg-username").value.trim();
      const password = document.getElementById("reg-password").value;
      if (!username || !password) {
        alert("Proszę podać nazwę użytkownika i hasło");
        return;
      }
      try {
        const res = await fetch(`${API_BASE}/register`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, password })
        });
        const data = await res.json();
        if (!res.ok) {
          let msg = data.detail;
          if (Array.isArray(data.detail)) {
            msg = data.detail.map(item => item.msg || JSON.stringify(item)).join("\n");
          } else if (typeof data.detail === 'object') {
            msg = JSON.stringify(data.detail);
          }
          alert(msg || "Błąd rejestracji");
          return;
        }
        alert("Rejestracja zakończona sukcesem! Możesz się teraz zalogować.");
        window.location.href = "index.html";
      } catch (err) {
        console.error(err);
        alert("Wystąpił błąd sieci przy rejestracji");
      }
    });
  }
});
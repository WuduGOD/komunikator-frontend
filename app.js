// SDK Facebooka - Inicjalizacja
window.fbAsyncInit = function() {
    FB.init({
      appId      : 'TWOJE_APP_ID',  // <<=== tu wpisz swój App ID Facebooka
      cookie     : true,
      xfbml      : true,
      version    : 'v19.0'  // aktualna wersja API Facebooka
    });
};

// Obsługa kliknięcia przycisku logowania
document.getElementById('loginBtn').addEventListener('click', function() {
    FB.login(function(response) {
        if (response.authResponse) {
            console.log('Zalogowano przez Facebooka!');
            console.log('Token dostępu:', response.authResponse.accessToken);

            // Tutaj w przyszłości: wysyłamy token do backendu FastAPI
            onLoginSuccess(response.authResponse.accessToken);

        } else {
            console.log('Logowanie anulowane.');
        }
    }, {scope: 'public_profile,email'});
});

// Funkcja po udanym logowaniu
function onLoginSuccess(accessToken) {
    document.getElementById('login-section').style.display = 'none';
    document.getElementById('chat-section').style.display = 'block';

    // TODO: tutaj potem połączysz się z backendem FastAPI i WebSocketem
}

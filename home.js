document.getElementById('hamburger').addEventListener('click', function() {
    var menu = document.getElementById('menu');
    if (menu.style.display === 'block') {
        menu.style.display = 'none';
    } else {
        menu.style.display = 'block';
    }
});

function logout() {
        localStorage.removeItem('accessToken'); // Clear access token
        localStorage.removeItem('idToken'); // Clear ID token
        window.location.replace('index.html'); // Redirect to login page
}

document.addEventListener('DOMContentLoaded', function() {
    // Check if tokens exist in localStorage
    const accessToken = localStorage.getItem('accessToken');
    const idToken = localStorage.getItem('idToken');

    // If tokens are missing, redirect to index.html to login
    if (!accessToken || !idToken) {
      window.location.replace('index.html');
    }
});
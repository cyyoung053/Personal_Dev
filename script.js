document.addEventListener("DOMContentLoaded", function() {
    // Function to load page content
    function loadContent(page) {
        fetch(page)
            .then(response => response.text())
            .then(html => {
                document.getElementById('content').innerHTML = html;
            })
            .catch(err => console.error('Failed to load content:', err));
    }

    // Load the default page
    loadContent('index.html');

    // Add event listeners to navigation links
    document.querySelectorAll('nav a').forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault(); // Prevent the default anchor behavior
            const page = this.getAttribute('href');
            loadContent(page); // Load the page content
        });
    });
});

function checkCredentials() {
    const username = prompt("Enter username:");
    const password = prompt("Enter password:");

    // Static username and password
    const correctUsername = "marty";
    const correctPassword = "fluxcapacitor88";

    // Check if username and password are correct
    if (username === correctUsername && password === correctPassword) {
        alert("Great Scott! You're in!");
        // Set the authenticated flag in local storage
        localStorage.setItem("authenticated", "true");
        window.location.href = "home.html"; // Redirect to home.html after successful login
    } else {
        alert("Whoa, Doc! Incorrect credentials!");
    }
}

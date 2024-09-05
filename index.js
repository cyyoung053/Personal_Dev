function checkCredentials() {
    const username = prompt("Enter username:");
    const password = prompt("Enter password:");

    fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert("Great Scott! You're in!");
            window.location.href = "home.html"; // Redirect on successful login
        } else {
            alert("Whoa, Doc! Incorrect credentials!");
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}
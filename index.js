function checkCredentials() {
    const username = prompt("Enter username:");
    const password = prompt("Enter password:");

    console.log("Attempting to log in with:", { username, password });

    fetch('https://www.testingsite.me/', {  // Make sure this points to localhost:5500
        method: 'POST',  // Ensure the method is POST
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),  // Send the username and password in JSON format
    })
    .then(response => {
        console.log("Server response status:", response.status);
        if (!response.ok) {
            throw new Error('Failed to authenticate. Status code: ' + response.status);
        }
        return response.json();
    })
    .then(data => {
        console.log("Response data:", data);
        if (data.success) {
            alert("Great Scott! You're in!");
            window.location.href = "home.html";  // Redirect on successful login
        } else {
            alert("Whoa, Doc! Incorrect credentials!");
        }
    })
    .catch(error => {
        console.error('Error during fetch or response handling:', error);
        alert("An error occurred: " + error.message);
    });
}

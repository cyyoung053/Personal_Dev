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

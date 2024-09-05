    function checkCredentials() {
    const username = prompt("Enter username:");
    const password = prompt("Enter password:");

    // Static username and password
    const correctUsername = "marty";
    const correctPassword = "fluxcapacitor88";

    // Check if username and password are correct
    if (username === correctUsername && password === correctPassword) {
        alert("Great Scott! You're in!");
        window.location.href = "http://www.bttf.com"; // Replace with your desired URL
    } else {
        alert("Whoa, Doc! Incorrect credentials!");
    }
}

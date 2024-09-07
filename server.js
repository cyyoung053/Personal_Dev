const express = require('express');
const fs = require('fs');
const csv = require('csv-parser');
const bodyParser = require('body-parser');
const cors = require('cors');  // Import cors

const app = express();

// Use CORS to allow requests from specific origins (or allow all origins)
app.use(cors({
    origin: '*',  // Allow only requests from this origin
    methods: ['GET', 'POST', 'OPTIONS'],  // Allow only these methods
    allowedHeaders: ['Content-Type', 'Authorization']  // Allow specific headers
}));

app.use(bodyParser.json());

let users = [];

// Load the CSV file into an array of users
fs.createReadStream('users.csv')
    .pipe(csv())
    .on('data', (row) => {
        console.log("Adding user:", row);  // Log each user from the CSV file
        users.push(row);
    })
    .on('end', () => {
        console.log('All users loaded:', users);  // Log all users after loading CSV
    });

app.post('/login', (req, res) => {
    const { username, password } = req.body;

    console.log("Received credentials:", { username, password });

    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
        console.log("User authenticated successfully:", user);
        res.json({ success: true, message: 'Authentication successful' });
    } else {
        console.log("Authentication failed for username:", username);
        res.status(401).json({ success: false, message: 'Invalid username or password' });
    }
});

// Start the server on port 5500
app.listen(5500, () => {
    console.log('Server running on port 5500');
});

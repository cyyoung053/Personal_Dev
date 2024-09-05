const express = require('express');
const fs = require('fs');
const csv = require('csv-parser');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

let users = [];

// Load the CSV file
fs.createReadStream('users.csv')
    .pipe(csv())
    .on('data', (row) => {
        users.push(row); // Add each user to the users array
    })
    .on('end', () => {
        console.log('CSV file successfully processed');
    });

// Authenticate user
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
        res.json({ success: true, message: 'Authentication successful' });
    } else {
        res.status(401).json({ success: false, message: 'Invalid username or password' });
    }
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});

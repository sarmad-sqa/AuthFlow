const express = require('express');
const bcrypt = require('bcrypt');
const db = require('./db');
const app = express();

app.use((req, res, next) => {
    const origin = req.get('Origin');
    const isLocalFrontend = origin && /^http:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin);

    if (isLocalFrontend) {
        res.setHeader('Access-Control-Allow-Origin', origin);
        res.setHeader('Vary', 'Origin');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

        if (req.method === 'OPTIONS') {
            return res.sendStatus(204);
        }
    }

    next();
});

app.use(express.json());
app.get('/', (req, res) => {
    res.send(`Backend is running! Method: ${req.method}`);

});


// POST request ko /signup endpoint par handle karte hain
// async isliye use kiya kyun ke hashing aur database operations asynchronous hain
app.post('/signup', async (req, res) => {

    // Request body se username, email aur password extract karte hain
    const { username, email, password } = req.body;

    // Check karte hain ke user ne tamam required fields provide ki hain
    if (!username || !email || !password) {

        // Agar koi field missing hai toh execution stop karke 400 response bhejte hain
        return res.status(400).json({

            // Client ko validation error ka message dete hain
            message: 'All fields are required'
        });
    }

    // try block mein hashing aur database insertion perform karte hain
    try {

        // Original password ko bcrypt ki help se hash karte hain
        const hashedPassword = await bcrypt.hash(password, 10);

        // Turso database mein new user ka record insert karte hain
        await db.execute({

            // SQL query mein users table ke required columns specify karte hain
            // Question marks parameter placeholders hain
            sql: `INSERT INTO users (username, email, password_hash)
                  VALUES (?, ?, ?)`,

            // Placeholders ki corresponding values provide karte hain
            // Original password ke bajaye hashedPassword save hota hai
            args: [username, email, hashedPassword]
        });

        // User successfully create hone par HTTP 201 response bhejte hain
        return res.status(201).json({

            // Client ko successful registration ka message dete hain
            message: 'Signup successful! User created.'
        });

    // Hashing ya database insertion mein error aaye toh catch execute hota hai
    } catch (error) {

    // Actual error terminal mein display karte hain
    console.error('Signup error:', error.message);

    // Check karte hain ke error UNIQUE constraint ki wajah se aaya hai
    if (error.message.includes('UNIQUE constraint failed')) {

        // Duplicate email par HTTP 409 Conflict return karte hain
        return res.status(409).json({
            message: 'Email already registered'
        });
    }

    // Baqi unexpected errors ke liye HTTP 500 return karte hain
    return res.status(500).json({
        message: 'Unable to create user'
        });
    }
});

app.get('/db-test', async (req, res) => {
      try {
        const result = await db.execute('SELECT 1 AS connected');

        res.status(200).json({
            message: 'Turso connection successful',
            connected: result.rows[0].connected
        });

    } catch (error) {
        console.error('Database connection failed:', error.message);

        res.status(500).json({
            message: 'Database connection failed'
        });
    }
    });

// Server start
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

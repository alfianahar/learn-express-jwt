const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const app = express();
const port = 3000;

// Secret key for JWT
const secretKey = 'your-secret-key';

// Sample user data (replace with a database in a production application)
const users = [
    { id: 1, username: 'admin', password: 'qwerty123' },
    { id: 2, username: 'user2', password: 'password2' },
];

app.use(bodyParser.json());


app.get('/', (req, res) => {
    res.json({ 'message': 'ok' });
})

app.use(express.json());

// Import the authentication middleware
const authenticateToken = require('./src/middleware/auth');

// Import the city routes
const citiesRouter = require('./src/cities/cities.route');

// Login endpoint
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;

    const user = users.find((u) => u.username === username && u.password === password);

    if (!user) {
        return res.status(401).send('Invalid username or password.');
    }

    const token = jwt.sign({ id: user.id, username: user.username }, secretKey, {
        expiresIn: '1h',
    });

    res.json({ token });
});

// Mount the city routes with authentication
app.use('/api', authenticateToken, citiesRouter);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

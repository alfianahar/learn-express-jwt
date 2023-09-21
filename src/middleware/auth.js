const jwt = require('jsonwebtoken');
const secretKey = 'your-secret-key';

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (!token) return res.status(401).send('Access denied. No token provided.');

    jwt.verify(token, secretKey, (err, user) => {
        if (err) return res.status(403).send('Invalid token.');
        req.user = user;
        next();
    });
}

module.exports = authenticateToken;

const jwt = require('jsonwebtoken');

const authenticateJWT = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({ message: 'Token needed' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(400).json({ message: 'Invalid token' });
        }
        // Check token expiration
        if (decoded && decoded.exp && Date.now() >= decoded.exp * 1000) {
            return res.status(403).json({ message: 'Token expired' });
        }
        req.userId = decoded.userId;
        next(); // Proceed to the next middleware or route handler
    });
};

module.exports = { authenticateJWT };
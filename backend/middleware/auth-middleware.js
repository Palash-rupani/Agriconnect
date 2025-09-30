// middleware/auth-middleware.js
const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
  const token = req.headers['authorization']; // Keep as-is, no Bearer assumption
  console.log('Received Authorization Header:', token); // Debug
  if (!token) {
    return res.status(401).send({ message: 'Access Forbidden' });
  }

  try {
    const decoded = jwt.verify(token, 'jwtkey121');
    console.log('Decoded Token:', decoded); // Debug
    req.user = decoded;
    next();
  } catch (err) {
    console.error('Token Verification Error:', err.message); // Debug
    return res.status(401).send({ message: 'Invalid Token' });
  }
}

function verifyAdmin(req, res, next) {
  console.log('User in verifyAdmin:', req.user); // Debug
  if (req.user && req.user.isadmin) { // Changed to lowercase 'isadmin'
    next();
  } else {
    return res.status(403).send({ message: 'Admin Access Required' });
  }
}

module.exports = { verifyToken, verifyAdmin };
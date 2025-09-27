// middleware/auth-middleware.js
const jwt= require('jsonwebtoken');

function verifyToken(req, res, next) {
    const token = req.headers['authorization'];
    if(!token) {
        return res.status(401).send({message: "Access Forbidden"});
    }
    try {
        const decoded = jwt.verify(token, 'jwtkey121');
        console.log("Decoded Token:", decoded);
        req.user = decoded;
        next();
    } catch(err) {
        return res.status(401).send({message: "Invalid Token"});
    }
}

function verifyAdmin(req, res, next) {
    if(req.user && req.user.isAdmin) {
        next();
    } else {
        return res.status(403).send({message: "Admin Access Required"});
    }
}

// 👇 renamed consistently
function verifyFarmer(req, res, next) {
    if(req.user && req.user.isFarmer) {
        next();
    } else if(req.user && req.user.isAdmin) {
        next();
    } else {
        return res.status(403).send({message: "Farmer Access Required"});
    }
}

// ✅ export with same name
module.exports = { verifyToken, verifyAdmin, verifyFarmer };

const jwt= require('jsonwebtoken');

function verifyToken(req, res, next) {
    const token = req.headers['authorization'];
    if(!token) {
        return res.status(401).send({message: "Access Forbidden"});
    }
    try {
        const decoded = jwt.verify(token, 'jwtkey121');
        console.log("Decoded Token:", decoded);
        next();
    } catch(err) {
        return res.status(401).send({message: "Invalid Token"});
    }
}


module.exports = { verifyToken };
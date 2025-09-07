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
    if(req.user && req.user.isadmin) {
        next();
    } else {
        return res.status(403).send({message: "Admin Access Required"});
    }
}

function verifyfarmer(req, res, next) {
    if(req.user && req.user.isfarmer) {
        next();
    }
    else if(req.user && req.user.isadmin){
        next();
    }
    else {
        return res.status(403).send({message: "Admin Access Required"});
    }
}


module.exports = { verifyToken ,verifyAdmin,verifyfarmer};
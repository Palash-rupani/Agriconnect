const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../handlers/auth-handler');

// Register
router.post('/register', async (req, res) => {
    try {
        let model = req.body;
        if (model.name && model.email && model.password) {
            await registerUser(model);
            res.status(201).send({ message: "User registered successfully" });
        } else {
            res.status(400).send({ message: "All fields are required" });
        }
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: "Internal Server Error" });
    }
});

// Login
router.post('/login', async (req, res) => {
    try {
        let model = req.body;
        if (model.email && model.password) {
            const result = await loginUser(model); 
            if (result) {
                res.status(200).send(result);
            } else {
                res.status(401).send({ message: "Invalid credentials" });
            }
        } else {
            res.status(400).send({ message: "All fields are required" });
        }
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: err.message || "Internal Server Error" });
    }
});

module.exports = router;

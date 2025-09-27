
const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../handlers/auth-handler');

// Register
router.post('/register', async (req, res) => {
    try {
        console.log("📥 Incoming body:", req.body);  // 👈 log what Angular sends

        let model = req.body;
        if (model.name && model.email && model.password) {
            const result = await registerUser(model);
            console.log("✅ User created:", result);  // 👈 log after save
            res.status(201).send({ message: "User registered successfully" });
        } else {
            console.warn("⚠️ Missing fields:", model);
            res.status(400).send({ message: "All fields are required" });
        }
    } catch (err) {
        console.error("❌ Register error:", err);   // 👈 print full error
        res.status(500).send({ message: err.message || "Internal Server Error" });
    }
});

// Login
router.post('/login', async (req, res) => {
    try {
        let model = req.body;
        if (model.email && model.password) {
            const result = await loginUser(model); 
            console.log("🔑 Login result:", result);
            if (result) {
                res.status(200).send(result);
            } else {
                res.status(401).send({ message: "Invalid credentials" });
            }
        } else {
            console.warn("⚠️ Missing login fields:", model);
            res.status(400).send({ message: "All fields are required" });
        }
    } catch (err) {
        console.error("❌ Login error:", err);
        res.status(500).send({ message: err.message || "Internal Server Error" });
    }
});

module.exports = router;


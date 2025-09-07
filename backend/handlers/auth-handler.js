const user = require('../db/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

async function registerUser(model) {
    const hashedPassword = await bcrypt.hash(model.password, 10);
    const newUser = new user({
        name: model.name,
        email: model.email,
        password: hashedPassword,
    });
    await newUser.save();
    return { message: "User registered successfully" };
}

async function loginUser(model) {
    const existingUser = await user.findOne({ email: model.email }); // ✅ use findOne
    if (!existingUser) {
        throw new Error("User not found");
    }

    const isPasswordValid = await bcrypt.compare(model.password, existingUser.password);
    if (!isPasswordValid) {
        throw new Error("Invalid credentials");
    }

    // ✅ create JWT
    const jwtToken = jwt.sign(
        { id: existingUser._id, name: existingUser.name, email: existingUser.email ,isadmin: existingUser.isAdmin,isfarmer: existingUser.isfarmer},
        'jwtkey121',
        { expiresIn: '1h' }
    );

    return { jwtToken, existingUser };
}

module.exports = { registerUser, loginUser };

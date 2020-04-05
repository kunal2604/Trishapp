const express = require('express');
const userController = require('../controllers/user.controller');
const authController = require('../controllers/auth.controller');
const asyncHandler = require('express-async-handler');

const router = express.Router();

//localhost:4050/api/auth/register
router.post('/register', asyncHandler(insert), login);
router.post('/login', asyncHandler(getUserByEmailAndPassword), login);

async function insert(req, res, next) {
    const user = req.body;
    console.log(`Registering user`);
    req.user = await userController.insert(user);

    next();
}
 
async function getUserByEmailAndPassword(req, res, next) {
    const user = req.body;
    console.log(`Searching user for `, user);
    const savedUser = await userController.getUserByEmailAndPassword(
        user.email, user.password
    );
    req.user = savedUser;
    
    next();
}

function login(req, res) {
    const user = req.user;
    const token = authController.generateToken(user);
    res.json({
        user,
        token
    })
}
module.exports = router;
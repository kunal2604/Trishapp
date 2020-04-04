const express = require('express');
const userController = require('../controllers/user.controller');
const asyncHandler = require('express-async-handler');

const router = express.Router();

//localhost:4050/api/auth/register
router.post('/register', asyncHandler(insert));

router.post('/login', asyncHandler(getUserByEmailAndPassword));

async function insert(req, res, next) {
    const user = req.body;
    console.log(`Registering user`);
    const savedUser = await userController.insert(user);
    res.json(savedUser);
}
 
async function getUserByEmailAndPassword(req, res, next) {
    const user = req.body;
    console.log(`Searching user for `, user);
    const savedUser = await userController.getUserByEmailAndPassword(
        user.email, user.password
    );
    res.json(savedUser);
}

module.exports = router;
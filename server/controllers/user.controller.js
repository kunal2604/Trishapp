
const User = require('../models/user.model');
const bcrypt = require('bcrypt');

async function insert(user) {
    // make a mongoose db call to save user in db
    console.log(`Saving user to db`, user);
    user.hashedPassword = bcrypt.hashSync(user.password, 10);
    delete user.password;
    
    console.log(`Saving user to DB `, user);
    return await new User(user).save();
}

module.exports = {
    insert
};
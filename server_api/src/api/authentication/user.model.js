const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({    
    name: { type: String, index: { unique: true } },
    password_hash: String
});

const User = mongoose.model('User', userSchema, 'users');
module.exports = User;
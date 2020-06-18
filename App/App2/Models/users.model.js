const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for users
let users = new Schema({
    id: {
        type: Number
    },
    name: {
        type: String
    },
    address: {
        type : String
    },
    email: {
        type: String
    },
    username: {
        type: String
    },
    password: {
        type: String
    },
    phone: {
        type:String
    },
    avatarUrl: {
        type:String
    },
    createdAt: {
        type: Number
    }
}, {
    collection: 'users'
});

module.exports = mongoose.model('users', users);

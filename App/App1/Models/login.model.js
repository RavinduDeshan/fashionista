// category.model.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for login
let loging = new Schema({
    id: {
        type: Number
    },
    username: {
        type: String
    },
    password: {
        type: String
    },
    is_active: {
        type: Number
    },
    role: {
        type:String
    },
    email: {
        type:String
    }
}, {
    collection: 'login'
});

module.exports = mongoose.model('loging', loging);

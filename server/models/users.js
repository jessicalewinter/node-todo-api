var mongoose = require('mongoose');

var Users = mongoose.model('Users', {
    username: {
        type: String
    },
    password:{
        type: String
    },
    email: {
        type: String,
        required: true,
        trim: true,
        minlength: 1
    }
});

module.exports = {
    Users: Users
}
const mongoose = require("mongoose");
const passportLocalMongoose = require('passport-local-mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: String,
    name: String,
    image: {
        secure_url: { type: String, default: '/imgs/default-profile.jpg' },
        public_id: String
    },
    bio: String,
    phone: String,
    address: String,
    display: { type: Boolean, default: false },
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', userSchema);
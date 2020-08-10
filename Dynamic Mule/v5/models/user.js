const mongoose = require("mongoose");
const passportLocalMongoose = require('passport-local-mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: String,
    image: String,
    projects: [{
        type: Schema.Types.ObjectId,
        ref: "Project"
    }],
    isAllowed: { type: Boolean, default: false }
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', userSchema);
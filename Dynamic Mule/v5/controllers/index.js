const User = require('../models/user')
const passport = require('passport')

module.exports = {
    // post regiser method
    async postRegister(req, res, next) {
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            image: req.body.image
        });
        if (req.body.regCode === process.env.REG_CODE) {
            newUser.isAllowed = true;
            await User.register(newUser, req.body.password);
            res.redirect('/projects');
        }
    },

    // post login method
    postLogin(req, res, next) {
        passport.authenticate('local', {
            successRedirect: '/projects',
            failureRedirect: '/login'
        })(req, res, next);
    },

    // get logout method
    getLogout(req, res, next) {
        req.logout();
        res.redirect('/projects');
    }
}
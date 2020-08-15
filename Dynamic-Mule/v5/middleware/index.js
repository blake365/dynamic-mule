const User = require('../models/user');

module.exports = {
    asyncErrorHandler: (fn) =>
        (req, res, next) => {
            Promise.resolve(fn(req, res, next))
                .catch(next);
        },
    isLoggedIn: (req, res, next) => {
        if (req.isAuthenticated()) return next();
        req.session.error = "You need to be logged in to do that";
        req.session.redirectTo = req.originalUrl;
        res.redirect('/login')
    },
    isAllowed: async(req, res, next) => {
        const allowed = new User(req.body);
        if (req.body.regCode === process.env.REG_CODE) {
            allowed.isAllowed = true;
            return next();
        }
        const { username, email } = req.body;
        req.session.error = "You must have a registration code to create an account";
        res.render('register', { title: 'Register', username, email })
    },
}
const User = require('../models/user')
const passport = require('passport')

module.exports = {

    getRegister(req, res, next) {
        res.render('register', { title: 'Register', username: '', email: '' });
    },

    // post regiser method
    async postRegister(req, res, next) {
        // const newUser = new User(req.body);
        // if (req.body.regCode === process.env.REG_CODE) {
        //     newUser.isAllowed = true;
        // }
        // if (user.isAllowed === true) {
        try {
            const user = await User.register(new User(req.body), req.body.password)
            req.login(user, function(err) {
                if (err) return next(err);
                req.flash('success', `Welcome, ${user.username}`);
                res.redirect('/projects');
            });
            // } else if (newUser.isAllowed === false) {
            //     const { username, email } = req.body;
            //     req.flash("error", "You must have a registration code to create an account");
            //     res.render('register', { title: 'Register', username, email });
        } catch (err) {
            const { username, email } = req.body;
            let error = err.message;
            if (error.includes('duplicate') && error.includes('index: email_1 dup key')) {
                error = 'A user with the given email is already registered';
            }
            res.render('register', { title: 'Register', username, email, error });
        }

    },

    // post login method
    async postLogin(req, res, next) {
        const { username, password } = req.body;
        const { user, error } = await User.authenticate()(username, password);
        if (!user && error) return next(error);
        req.login(user, function(err) {
            if (err) return next(err);
            req.session.success = `Welcome back, ${username}`;
            const redirectUrl = req.session.redirectTo || '/projects';
            delete req.session.redirectTo;
            res.redirect(redirectUrl);
        });
    },

    // get logout method
    getLogout(req, res, next) {
        req.logout();
        req.flash("success", "Logged Out")
        res.redirect('/projects');
    }
}
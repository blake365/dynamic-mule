const User = require('../models/user')
const Project = require('../models/project')
const passport = require('passport');
const util = require('util');


module.exports = {

    landingPage(req, res, next) {
        res.render('index', { title: 'Mule Studio - Home' });
    },

    getRegister(req, res, next) {
        res.render('register', { title: 'Register', username: '', email: '' });
    },

    // post regiser method
    async postRegister(req, res, next) {
        // middleware should catch if the registration code is entered and only then allow the registration to continue. 
        try {
            const user = await User.register(new User(req.body), req.body.password)
            req.login(user, function(err) {
                if (err) return next(err);
                req.flash('success', `Welcome, ${user.username}`);
                res.redirect('/projects');
            });
        } catch (err) {
            const { username, email } = req.body;
            let error = err.message;
            if (error.includes('duplicate') && error.includes('index: email_1 dup key')) {
                error = 'A user with the given email is already registered';
            }
            res.render('register', { title: 'Register', username, email, error });
        }

    },
    // GET /login
    getLogin(req, res, next) {
        if (req.isAuthenticated()) return res.redirect('/');
        if (req.query.returnTo) req.session.redirectTo = req.headers.referer;
        res.render('login', { title: 'Login' });
    },

    // post login method
    async postLogin(req, res, next) {
        const { username, password } = req.body;
        const { user, error } = await User.authenticate()(username, password);
        if (!user && error) return next(error);
        req.login(user, function(err) {
            if (err) return next(err);
            req.flash('success', `Welcome back, ${username}`);
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
    },

    async getProfile(req, res, next) {
        const projects = await Project.find().where('author').equals(req.user._id).limit(10).exec();
        res.render('profile', { projects });
    },

    async updateProfile(req, res, next) {
        // destructure username and email from req.body
        const {
            username,
            email
        } = req.body;
        // destructure user object from res.locals
        const { user } = res.locals;
        // check if username or email need to be updated
        if (username) user.username = username;
        if (email) user.email = email;
        // save the updated user to the database
        await user.save();
        // promsify req.login
        const login = util.promisify(req.login.bind(req));
        // log the user back in with new info
        await login(user);
        // redirect to /profile with a success flash message
        req.session.success = 'Profile successfully updated!';
        res.redirect('/profile');
    }
}
const User = require('../models/user');
const { cloudinary } = require('../cloudinary')

const middleware = {
    asyncErrorHandler: (fn) =>
        (req, res, next) => {
            Promise.resolve(fn(req, res, next))
                .catch(next);
        },
    isLoggedIn: (req, res, next) => {
        if (req.isAuthenticated()) return next();
        req.flash('error', "You need to be logged in to do that");
        req.session.redirectTo = req.originalUrl;
        res.redirect('/login')
    },
    isAllowed: async(req, res, next) => {
        const { username, regCode } = req.body;
        console.log(regCode);
        console.log(username);
        if (regCode === process.env.REG_CODE) {
            return next();
        } else {
            req.flash('error', "You must have a registration code to create an account");
            res.render('register', { title: 'Register', username });
        };
    },
    isValidPassword: async(req, res, next) => {
        const { user } = await User.authenticate()(req.user.username, req.body.currentPassword)
        if (user) {
            // add user to res.locals
            res.locals.user = user;
            // go to next middleware
            next();
        } else {
            middleware.deleteProfileImage(req);
            // flash an error
            req.flash('error', 'Incorrect Current Password!');
            // short circuit the route middleware and redirect to /profile
            return res.redirect('/profile');
        }
    },
    changePassword: async(req, res, next) => {
        // destructure new password values from req.body object
        const {
            newPassword,
            passwordConfirmation
        } = req.body;
        // check if new password values exist
        if (newPassword && !passwordConfirmation) {
            middleware.deleteProfileImage(req);
            req.flash('error', "Missing password confirmation");
            return res.redirect('profile');
        } else if (newPassword && passwordConfirmation) {
            // destructure user from res.locals
            const { user } = res.locals;
            // check if new passwords match
            if (newPassword === passwordConfirmation) {
                // set new password on user object
                await user.setPassword(newPassword);
                // go to next middleware
                next();
            } else {
                middleware.deleteProfileImage(req);
                // flash error
                req.flash('error', 'New passwords must match!');
                // short circuit the route middleware and redirect to /profile
                return res.redirect('/profile');
            }
        } else {
            // go to next middleware
            next();
        }
    },

    deleteProfileImage: async req => {
        if (req.file) await cloudinary.v2.uploader.destroy(req.file.public_id);
    }

};

module.exports = middleware;
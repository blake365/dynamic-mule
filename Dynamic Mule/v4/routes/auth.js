var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");
var Project = require("../models/project");
require('dotenv').config();

router.get("/", function(req, res) {
    res.redirect("/projects");
});

//auth routes

router.get("/register", function(req, res) {
    res.render("register");
})

router.post("/register", function(req, res) {
    var newUser = new User({ username: req.body.username });
    if (req.body.regCode === 'secretcode890') {
        newUser.isAllowed = true;
        User.register(newUser, req.body.password, function(err, user) {
            if (err) {
                console.log(err);
                return res.render("register");
            } else {
                passport.authenticate("local")(req, res, function() {
                    res.redirect("/projects");
                });
            }
        });
    } else {
        req.flash("error", "You must have a registration code to register")
        res.redirect("/register")
    }
});

router.get("/login", function(req, res) {
    res.render("login");
});

router.post("/login", passport.authenticate("local", {
    successRedirect: "/projects",
    failureRedirect: "/login"
}), function(req, res) {});

router.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/projects")
});

//check if user is logged in, used as middleware to prevent access to secret page
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login")
}

module.exports = router;
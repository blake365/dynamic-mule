const express = require("express"),
    app = express(),
    methodOverride = require("method-override"),
    mongoose = require("mongoose"),
    Project = require("./models/project"),
    seedDB = require("./seeds"),
    User = require("./models/user"),
    passport = require("passport"),
    LocalStrategy = require("passport-local"),
    flash = require("connect-flash"),
    dotenv = require('dotenv').config();


const expressSanitizer = require("express-sanitizer");

var projectRoutes = require("./routes/projects");
var authRoutes = require("./routes/auth");

// Start DB connection with backup db
var url = process.env.DATABASEURL || "mongodb://localhost:27017/mule_project";

mongoose.connect(url, {

        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Connected to DB!'))
    .catch(error => console.log(error.message));

app.use(express.urlencoded({ entended: true }));
app.use(express.json({ entended: true }));
app.set("view engine", "ejs");
app.use(express.static("public", { entended: true }));
app.use(methodOverride("_method"));
app.use(flash());

// removes script tags from form input, still allows html
app.use(expressSanitizer());

// DB seed
// seedDB();

//set up passport
app.use(require("express-session")({
    secret: "life is a box of chocolates",
    resave: false,
    saveUninitialized: false
}));


app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next) {
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

//connect to routes
app.use("/", authRoutes);
app.use("/projects", projectRoutes);




var port = process.env.PORT || 3000;
app.listen(port, function() {
    console.log("Server Has Started!");
});
const express = require("express"),
    app = express(),
    methodOverride = require("method-override"),
    mongoose = require("mongoose"),
    Project = require("./models/project"),
    seedDB = require("./seeds"),
    User = require("./models/user"),
    passport = require("passport"),
    LocalStrategy = require("passport-local");


const expressSanitizer = require("express-sanitizer");

var projectRoutes = require("./routes/projects");
var authRoutes = require("./routes/auth");

mongoose.connect('mongodb://localhost:27017/mule_project', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Connected to DB!'))
    .catch(error => console.log(error.message));

//changing body parser to just express
app.use(express.urlencoded({ entended: true }));
app.use(express.json());
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(methodOverride("_method"));

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
    next();
});

//connect to routes
app.use("/", authRoutes);
app.use("/projects", projectRoutes);




let port = process.env.PORT;
if (port == null || port == "") {
    port = 8000;
}
app.listen(port);
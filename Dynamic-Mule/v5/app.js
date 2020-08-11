const dotenv = require('dotenv').config(),
    createError = require('http-errors'),
    express = require("express"),
    session = require('express-session'),
    methodOverride = require("method-override"),
    path = require('path'),
    mongoose = require("mongoose"),
    User = require("./models/user"),
    passport = require("passport"),
    flash = require("connect-flash"),
    cookieParser = require('cookie-parser'),
    expressSanitizer = require("express-sanitizer"),
    logger = require('morgan');
// seedDB = require("./seeds"),

const projects = require("./routes/projects");
const index = require("./routes/index");

app = express();

// Start DB connection with backup db
var url = process.env.DATABASEURL || "mongodb://localhost:27017/moose_project";

mongoose.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Connected to DB!'))
    .catch(error => console.log(error.message));
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);


app.set('views', path.join(__dirname, 'views'));
app.set("view engine", "ejs");

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride("_method"));
app.use(flash());


// removes script tags from form input, still allows html
app.use(expressSanitizer());

// DB seed
// seedDB();

//set up passport
app.set('trust proxy', 1); // trust first proxy
app.use(session({
    secret: 'if a moose sleeps in the forest',
    resave: false,
    saveUninitialized: true,
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next) {
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

//connect to routes
app.use("/", index);
app.use("/projects", projects);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    // render the error page
    res.status(err.status || 500);
    res.render('error');
});


var port = process.env.PORT || 3000;
app.listen(port, function() {
    console.log("Server Has Started!");
});
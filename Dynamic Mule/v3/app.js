const express = require("express"),
    methodOverride = require("method-override"),
    mongoose = require("mongoose"),
    app = express();
const expressSanitizer = require("express-sanitizer");

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

//adding new db items for special show page/dashboard
var projectSchema = new mongoose.Schema({
    type: String,
    title: String,
    image: String,
    image1: String,
    image2: String,
    image3: String,
    image4: String,
    description: String,
    details: String,
    clientName: String,
    clientAddressStreet: String,
    clientAddressCity: String,
    clientAddressState: String,
    clientAddressZip: String,
    clientContactPhone: String,
    clientContactEmail: String,
    clientWebsite: String,
    primaryMaterial: String,
    secondaryMaterial: String,
    projAddressStreet: String,
    projAddressCity: String,
    projAddressState: String,
    projAddressZip: String,
    dateStarted: Date,
    dateCompleted: Date,
    customerReview: String,
    collaborators: String,
    price: Number,
    cost: Number,
    created: { type: Date, default: Date.now }
});

var Project = mongoose.model("Project", projectSchema);

// Home page
app.get("/", function(req, res) {
    res.redirect("/projects");
});

// Project Index/Home page
app.get("/projects", function(req, res) {
    Project.find({}, function(err, projects) {
        if (err) {
            console.log(err);
        } else {
            res.render("home", { projects: projects });
        }
    });
});

// create a new project
app.get("/projects/new", function(req, res) {
    res.render("new");
});

app.post("/projects", function(req, res) {
    req.body.project.description = req.sanitize(req.body.project.description);
    //create project
    Project.create(req.body.project, function(err, newProject) {
        if (err) {
            res.render("new");
        } else {
            res.redirect("/projects");
        }
    });
});

// show selected project
app.get("/projects/:id", function(req, res) {
    Project.findById(req.params.id, function(err, foundProject) {
        if (err) {
            res.redirect("/projects");
        } else {
            res.render("show", { project: foundProject });
        }
    })
});


//Edit project
app.get("/projects/:id/edit", function(req, res) {
    Project.findById(req.params.id, function(err, foundProject) {
        if (err) {
            res.redirect("/projects");
        } else {
            res.render("edit", { project: foundProject });
        }
    })

});

//update route
app.put("/projects/:id", function(req, res) {
    req.body.project.description = req.sanitize(req.body.project.description);
    Project.findByIdAndUpdate(req.params.id, req.body.project, function(err, updatedProject) {
        if (err) {
            res.redirect("/projects");
        } else {
            res.redirect("/projects/" + req.params.id);
        }
    })
});

// delete route
app.delete("/projects/:id", function(req, res) {
    Project.findByIdAndRemove(req.params.id, function(err) {
        if (err) {
            res.redirect("/projects");
        } else {
            res.redirect("/projects");
        }
    });
});


app.listen(2000);
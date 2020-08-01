var express = require("express");
var router = express.Router();
var Project = require("../models/project");
var User = require("../models/user");



// Project Index/Home page
router.get("/", function(req, res) {
    Project.find({}, function(err, projects) {
        if (err) {
            console.log(err);
        } else {
            res.render("home", { projects: projects });
        }
    });
});

router.get("/dashboard", isLoggedIn, function(req, res) {
    Project.find({}, function(err, projects) {
        if (err) {
            console.log(err);
        } else {
            res.render("dashboard", { projects: projects });
        }
    });;
});

// create a new project
router.get("/new", isLoggedIn, function(req, res) {
    res.render("new");
});

router.post("/", isLoggedIn, function(req, res) {
    req.body.project.description = req.sanitize(req.body.project.description);
    //create project
    Project.create(req.body.project, function(err, newProject) {
        if (err) {
            res.render("new");
        } else {
            req.flash("success", "Project Created")
            res.redirect("/projects");
        }
    });
});

// show selected project
router.get("/:id", function(req, res) {
    Project.findById(req.params.id, function(err, foundProject) {
        if (err) {
            res.redirect("/projects");
        } else {
            res.render("show", { project: foundProject });
        }
    })
});


//Edit project
router.get("/:id/edit", isLoggedIn, function(req, res) {
    Project.findById(req.params.id, function(err, foundProject) {
        if (err) {
            res.redirect("/projects");
        } else {
            res.render("edit", { project: foundProject });
        }
    })

});

//update route
router.put("/:id", isLoggedIn, function(req, res) {
    req.body.project.description = req.sanitize(req.body.project.description);
    Project.findByIdAndUpdate(req.params.id, req.body.project, function(err, updatedProject) {
        if (err) {
            res.redirect("/projects");
        } else {
            req.flash("success", "Project Edited")
            res.redirect("/projects/" + req.params.id);
        }
    })
});

// delete route
router.delete("/:id", isLoggedIn, function(req, res) {
    Project.findByIdAndRemove(req.params.id, function(err) {
        if (err) {
            res.redirect("/projects");
        } else {
            req.flash("success", "Project Deleted")
            res.redirect("/projects");
        }
    });
});

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login")
}

module.exports = router;
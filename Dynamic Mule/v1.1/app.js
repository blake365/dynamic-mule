const express = require("express");

const bodyParser = require("body-parser");

const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ entended: true }));

let projects = [
    { type: "res", name: "Credenze", image: "https://live.staticflickr.com/3167/2666373518_84d467bc36_b.jpg", description: "credenza with wood top" },
    { type: "res", name: "Credenze", image: "https://live.staticflickr.com/3167/2666373518_84d467bc36_b.jpg", description: "credenza with wood top" },
    { type: "res", name: "Credenze", image: "https://live.staticflickr.com/3167/2666373518_84d467bc36_b.jpg", description: "credenza with wood top" },
    { type: "res", name: "Credenze", image: "https://live.staticflickr.com/3167/2666373518_84d467bc36_b.jpg", description: "credenza with wood top" },
    { type: "res", name: "Credenze", image: "https://live.staticflickr.com/3167/2666373518_84d467bc36_b.jpg", description: "credenza with wood top" },
    { type: "res", name: "Coffee Table", image: "https://live.staticflickr.com/9/68597928_01a0119cbd_b.jpg", description: "Glass and steel coffee table" },
    { type: "comm", name: "Kitchen Table", image: "https://live.staticflickr.com/9/68597928_01a0119cbd_b.jpg", description: "Marble kitchen table" },
    { type: "comm", name: "Shelves", image: "https://live.staticflickr.com/1398/1444179529_86e0a27a8a_b.jpg", description: "custom built in shelves" },
    { type: "comm", name: "Shelves", image: "https://live.staticflickr.com/1398/1444179529_86e0a27a8a_b.jpg", description: "custom built in shelves" }
];


app.get("/", function(req, res) {
    res.render("home", { projects: projects });
});

app.post("/", function(req, res) {

    // get data from form and add to array
    let type = req.body.type;
    let name = req.body.name;
    let image = req.body.image;
    let description = req.body.description;

    let newProject = { type: type, name: name, image: image, description: description };
    projects.push(newProject);
    // redirect back to home page
    res.redirect("/");
});

app.get("/new", function(req, res) {
    res.render("new.ejs");
});

app.listen(2000);
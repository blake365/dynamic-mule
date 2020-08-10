const express = require('express');
const router = express.Router();
const { asyncErrorHandler } = require("../middleware");
const {
    projectIndex,
    projectNew,
    projectCreate,
    projectDashboard,
    projectShow,
    projectEdit,
    projectUpdate,
    projectDestroy
} = require('../controllers/projects');

// get projects index  /projects
router.get('/', asyncErrorHandler(projectIndex));

router.get('/new', isLoggedIn, projectNew);

router.post('/', asyncErrorHandler(projectCreate));

router.get("/dashboard", isLoggedIn, asyncErrorHandler(projectDashboard));

router.get('/:id', asyncErrorHandler(projectShow));

router.get('/:id/edit', isLoggedIn, asyncErrorHandler(projectEdit));

router.put('/:id', isLoggedIn, asyncErrorHandler(projectUpdate));

router.delete('/:id', isLoggedIn, asyncErrorHandler(projectDestroy));

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login")
}

module.exports = router;
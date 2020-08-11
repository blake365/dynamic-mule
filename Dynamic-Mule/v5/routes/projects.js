const express = require('express');
const router = express.Router();
const multer = require('multer')
const upload = multer({ 'dest': 'uploads/' });
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

router.get('/new', projectNew);

router.post('/', upload.array('images', 5), asyncErrorHandler(projectCreate));

router.get("/dashboard", asyncErrorHandler(projectDashboard));

router.get('/:id', asyncErrorHandler(projectShow));

router.get('/:id/edit', asyncErrorHandler(projectEdit));

router.put('/:id', asyncErrorHandler(projectUpdate));

router.delete('/:id', asyncErrorHandler(projectDestroy));

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login")
}

module.exports = router;
const express = require('express');
const router = express.Router();
const multer = require('multer')
const { storage } = require('../cloudinary');
const upload = multer({ storage });
const { asyncErrorHandler, isLoggedIn } = require("../middleware");
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

router.post('/', isLoggedIn, upload.array('images', 5), asyncErrorHandler(projectCreate));

router.get("/dashboard", isLoggedIn, asyncErrorHandler(projectDashboard));

router.get('/:id', asyncErrorHandler(projectShow));

router.get('/:id/edit', isLoggedIn, asyncErrorHandler(projectEdit));

router.put('/:id', isLoggedIn, upload.array('images', 5), asyncErrorHandler(projectUpdate));

router.delete('/:id', isLoggedIn, asyncErrorHandler(projectDestroy));



module.exports = router;
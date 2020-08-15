const express = require('express');
const router = express.Router();
const { getRegister, postRegister, postLogin, getLogout } = require('../controllers');
const { asyncErrorHandler, isAllowed } = require('../middleware');

/* GET home page. */
router.get('/', (req, res, next) => {
    res.render('index');
});

// GET /register
router.get('/register', getRegister);

router.post('/register', isAllowed, asyncErrorHandler(postRegister));

router.get('/login', (req, res, next) => {
    res.render('login');
});

router.post('/login', asyncErrorHandler(postLogin));

router.get('/logout', getLogout);

router.get('/profile', (req, res, next) => {
    res.send('GET /profile');
});

router.put('/profile/:user_id', (req, res, next) => {
    res.send('PUT /profile/:user_id');
});

// password reset routes
router.get('/forgot', (req, res, next) => {
    res.send('GET /forgot-pw');
});

router.put('/forgot', (req, res, next) => {
    res.send('PUT /forgot-pw');
});

router.get('/reset/:token', (req, res, next) => {
    res.send('GET /reset-pw/:token');
});

router.put('/reset/:token', (req, res, next) => {
    res.send('PUT /reset-pw/:token');
});

module.exports = router;
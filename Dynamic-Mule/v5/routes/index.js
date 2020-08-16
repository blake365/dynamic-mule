const express = require('express');
const router = express.Router();
const {
    landingPage,
    getRegister,
    postRegister,
    getLogin,
    postLogin,
    getLogout,
    getProfile,
    updateProfile
} = require('../controllers');
const {
    asyncErrorHandler,
    isAllowed,
    isLoggedIn,
    isValidPassword,
    changePassword
} = require('../middleware');

/* GET home page. */
router.get('/', landingPage);

// GET /register
router.get('/register', getRegister);

router.post('/register', isAllowed, asyncErrorHandler(postRegister));

router.get('/login', getLogin);

router.post('/login', asyncErrorHandler(postLogin));

router.get('/logout', getLogout);

router.get('/profile', isLoggedIn, asyncErrorHandler(getProfile));

router.put('/profile',
    isLoggedIn,
    asyncErrorHandler(isValidPassword),
    asyncErrorHandler(changePassword),
    asyncErrorHandler(updateProfile)
);

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
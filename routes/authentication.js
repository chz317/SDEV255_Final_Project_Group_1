const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../models/user');

// Registration route
router.post('/register', async (req, res) => {
    const { username, password, role } = req.body;
    try {
        const user = new User({ username, password, role });
        await user.save();
        res.redirect('/login');
    } catch (err) {
        res.status(400).send('Error registering user');
    }
});

// Login route
router.post('/login', passport.authenticate('local', {
    successRedirect: '/courses',
    failureRedirect: '/login',
    failureFlash: true
}));

// Logout route
router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/login');
});

module.exports = router;

const express = require('express');
const session = require('express-session');
const passport = require('passport');
const morgan = require('morgan');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const courseRoutes = require('./routes/courseRoutes');
const authRoutes = require('./routes/auth');
require('./config/passport');

const app = express();

// connect to mongoDB
const dbURI = `mongodb+srv://${process.env.db_user}:${process.env.db_pass}@sdev255projectteam1.aw1cgbj.mongodb.net/SDEV255ProjectTeam1`;

mongoose.connect(dbURI)
  .then(result => app.listen(3000))
  .catch(err => console.log(err));

// session setup
app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: false
}));

// passport initialization
app.use(passport.initialize());
app.use(passport.session());

// middleware & static files
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(express.json());

// pass user object to views
app.use((req, res, next) => {
    res.locals.user = req.user;
    next();
});

// routes
app.use('/courses', courseRoutes);
app.use(authRoutes); 

app.get('/', (req, res) => {
    res.redirect('/courses');
});

app.get('/about', (req, res) => {
    res.render('about', { title: 'About' });
});

// 404 page
app.use((req, res) => {
    res.status(404).render('404', { title: '404' });
});

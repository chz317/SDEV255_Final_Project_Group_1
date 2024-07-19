const express = require('express');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const courseRoutes = require('./routes/courseRoutes');
const authRoutes = require('./routes/authRoutes');
const User = require('./models/user');

const app = express();

// Connect to MongoDB
const dbURI = `mongodb+srv://${process.env.db_user}:${process.env.db_pass}@sdev255projectteam1.aw1cgbj.mongodb.net/SDEV255ProjectTeam1`;
mongoose.connect(dbURI)
  .then(result => app.listen(3000))
  .catch(err => console.log(err));

// Middleware for parsing request bodies and handling sessions
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Session configuration
app.use(session({
  secret: 'your_secret_key',
  resave: false,
  saveUninitialized: false
}));

// Initialize passport and use session
app.use(passport.initialize());
app.use(passport.session());

// Register view engine
app.set('view engine', 'ejs');

// Middleware & static files
app.use(express.static('public'));

// Configure passport local strategy
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Define your routes here
app.get('/', (req, res) => res.redirect('/courses')); // Redirect to courses page

app.get('/about', (req, res) => res.render('about', { title: 'About' })); // About page

// Authentication routes
app.use('/', authRoutes);

// Course routes
app.use('/courses', courseRoutes);

// 404 page
app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});

app.listen(3000, () => console.log('Server started on port 3000'));

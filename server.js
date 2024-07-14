const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const courseRoutes = require('./routes/courseRoutes');


// connect to mongoDB
const dbURI = `mongodb+srv://${process.env.db_user}:${process.env.db_pass}@sdev255projectteam1.aw1cgbj.mongodb.net/SDEV255ProjectTeam1`;

mongoose.connect(dbURI)
  .then(result => app.listen(3000))
  .catch(err => console.log(err));

// express app
const app = express();

// register view engine
app.set('view engine', 'ejs');

// middleware & static files
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(express.json())

// routes
app.get('/', (req, res) => {
  res.redirect('/courses')
});

app.get('/about', (req, res) => {
  res.render('about', { title: 'About' });
});

//course routes
app.use('/courses', courseRoutes);

// 404 page
app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});
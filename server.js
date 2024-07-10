const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const Course = require('./models/course');

// express app
const app = express();

// connect to mongoDB
const dbURI = `mongodb+srv://${process.env.db_user}:${process.env.db_pass}@sdev255projectteam1.aw1cgbj.mongodb.net/SDEV255ProjectTeam1`;

mongoose.connect(dbURI)
  .then(result => app.listen(3000))
  .catch(err => console.log(err));

// register view engine
app.set('view engine', 'ejs');

// middleware & static files
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));


// routes
app.get('/', (req, res) => {
  res.redirect('/courses');
});

app.get('/about', (req, res) => {
  res.render('about', { title: 'About' });
});

// course routes
app.get('/courses', (req, res) => {
  Course.find().sort({ createdAt: -1 })
    .then((result) => {
      res.render('index', { title: 'All Courses', courses: result });
    })
    .catch(err => {
      console.log(err);
    });
});

// Get courses/create form page
app.get('/courses/create', (req, res) => {
  res.render('create', { title: 'Create a new course' });
});

// POST REQUEST where courses are saved from create form
// form uses POST method to call this route
app.post('/courses', (req, res) => {
  const course = new Course(req.body);

  course.save()
    .then((result) => {
      res.redirect('/courses');
    })
    .catch((err) => {
      console.log(err);
    });
});

// Get course by its id
app.get('/courses/:id', (req, res) => {
  const id = req.params.id;
  Course.findById(id)
    .then((result) => {
      res.render('details', { course: result, title: 'Course Details' });
    })
    .catch((err) => {
      console.log(err);
    });
});

// Delete a course by its id
app.delete('/courses/:id', (req, res) => {
  const id = req.params.id;
  
  Course.findByIdAndDelete(id)
    .then((result) => {
      res.json({ redirect: '/courses' });
    })
    .catch(err => {
      console.log(err);
    });
});

// Edit course
app.get('/edit/', (req, res) => {
  res.render('edit', { title: 'Edit' });
});

// 404 page
app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});
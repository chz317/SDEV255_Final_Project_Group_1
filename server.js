const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose')
const Course = require('./models/course')

// express app
const app = express();

// connect to mongoDB
const dbURI = 'mongodb+srv://projectTeamOne:DjN6J8mONuQn0iF3@sdev255projectteam1.aw1cgbj.mongodb.net/SDEV255ProjectTeam1';

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

app.get('/courses/create', (req, res) => {
  res.render('create', { title: 'Create a new course' });
});


app.post('/courses', (req, res) => {
  // console.log(req.body);
  const course = new Course(req.body);

  course.save()
    .then((result) => {
      res.redirect('/courses');
    })
    .catch(err => {
      console.log(err);
    });
});

app.get('/courses/:id', (req, res) => {
  const id = req.params.id;
  Course.findById(id)
    .then(result => {
      res.render('details', { course: result, title: 'course Details' });
    })
    .catch(err => {
      console.log(err);
    });
});

app.delete('/courses/:id', (req, res) => {
  const id = req.params.id;
  
  Course.findByIdAndDelete(id)
    .then(result => {
      res.json({ redirect: '/courses' });
    })
    .catch(err => {
      console.log(err);
    });
});

// 404 page
app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});
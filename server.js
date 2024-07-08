const express = require('express');

// express app
const app = express();
app.use(morgan('dev'));
// listen for requests
app.listen(3000);

// register view engine
app.set('view engine', 'ejs');

// middleware & static files
app.use(express.static('public'));

app.use((req, res, next) => {
  console.log('new request made:');
  console.log('host: ', req.hostname);
  console.log('path: ', req.path);
  console.log('method: ', req.method);
  next();
});

app.use((req, res, next) => {
  console.log('in the next middleware');
  next();
});

app.use((req, res, next) => {
  res.locals.path = req.path;
  next();
});

app.get('/', (req, res) => {
  const courses = [
    {title: 'Course 1', snippet: 'Lorem ipsum dolor sit amet consectetur'},
    {title: 'Course 2', snippet: 'Lorem ipsum dolor sit amet consectetur'},
    {title: 'Course 3', snippet: 'Lorem ipsum dolor sit amet consectetur'},
  ];
  res.render('index', { title: 'Home', courses });
});

app.get('/about', (req, res) => {
  res.render('about', { title: 'About' });
});

app.get('/courses/create', (req, res) => {
  res.render('create', { title: 'Create a new course' });
});

// 404 page
app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});
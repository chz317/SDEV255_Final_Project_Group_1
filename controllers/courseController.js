const Course = require('../models/course');

const course_index = (req, res) => {
    Course.find().sort({ createdAt: -1 })
        .then((result) => {
            res.render('courses/index', { title: 'All Courses', courses: result })
        })
        .catch((err) => {
            console.log(err)
        })
}

const course_details = (req, res) => {
    const id = req.params.id;
    Course.findById(id)
        .then(result => {
            res.render('courses/details', { course: result, title: 'Course Details' });
        }) 
        .catch(err => {
            console.log(err)
        })
}

const course_create_get = (req, res) => {
    res.render('courses/create', { title: 'Create a New Course' });
}

const course_create_post = (req, res) => {
    const course = new Course(req.body);

    course.save()
        .then((result) => {
            res.redirect('/courses');
        })
        .catch((err) => {
            console.log(err)
        })
}

const course_delete = (req, res) => {
    const id = req.params.id;
    Course.findByIdAndDelete(id)
        .then(result => {
            res.json( { redirect: '/courses' });
        }) 
        .catch(err => {
            console.log(err)
        })
}

module.exports = {
    course_index,
    course_details,
    course_create_get,
    course_create_post,
    course_delete
}
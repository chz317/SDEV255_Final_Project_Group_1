const express = require('express');
const courseController = require('../controllers/courseController');
const { isAuthenticated, isTeacher } = require('../middleware/authenticationMiddle');
const router = express.Router();

// course routes
router.get('/', isAuthenticated, courseController.course_index);
router.post('/', isAuthenticated, isTeacher, courseController.course_create_post);
router.get('/create', isAuthenticated, isTeacher, courseController.course_create_get);
router.get('/:id', isAuthenticated, courseController.course_details);
router.put('/:id', isAuthenticated, isTeacher, courseController.course_update);
router.delete('/:id', isAuthenticated, isTeacher, courseController.course_delete);

module.exports = router;
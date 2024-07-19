const express = require('express');
const router = express.Router();
const { isAuthenticated, isTeacher } = require('../middleware/auth');
const courseController = require('../controllers/courseController');

router.get('/', isAuthenticated, courseController.course_index);
router.post('/', isTeacher, courseController.course_create_post);
router.get('/create', isTeacher, courseController.course_create_get);
router.get('/:id', isAuthenticated, courseController.course_details);
router.put('/:id', isTeacher, courseController.course_update);
router.delete('/:id', isTeacher, courseController.course_delete);

module.exports = router;

const express = require("express");
const router = express.Router();

const courses = require("../controller/courses");


router.route('/api/course').get(courses.getCourses);
router.route('/api/course/:courseId').get(courses.getCourse);
router.route('/api/user/course/:userId').get(courses.getUserCourses);
router.route('/api/course/add').post(courses.addCourse);

module.exports = router;
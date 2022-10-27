const express = require("express");
const router = express.Router();

const courses = require("../controller/courses");


router.route('/api/course/all').get(courses.getCourses);
router.route('/api/course/:courseId').get(courses.getCourse);
router.route('/api/course/add').post(courses.addCourse);

module.exports = router;
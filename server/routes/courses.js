const express = require("express");
const router = express.Router();

const courses = require("../controller/courses");


router.route('/api/courses/all').get(registration.courses);
module.exports = router;
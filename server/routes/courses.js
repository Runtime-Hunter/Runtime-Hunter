import { Router } from "express";
const router = Router();

import { getCourses, getCourse, getUserCourses, addCourse } from "../controller/courses.js";


router.route('/api/course').get(getCourses);
router.route('/api/course/:courseId').get(getCourse);
router.route('/api/user/course/:userId').get(getUserCourses);
router.route('/api/course').post(addCourse);

export default router;
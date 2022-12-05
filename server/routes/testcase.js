import { Router } from "express";
const router = Router();

import { getTestcases, getTestcase, addTestcase } from "../controller/testcase.js";


router.route('/api/testcase/:courseId/:levelId').get(getTestcases);
router.route('/api/testcase/question/:levelId').get(getTestcase);
router.route('/api/testcase/:courseId/:levelId').post(addTestcase);

export default router;
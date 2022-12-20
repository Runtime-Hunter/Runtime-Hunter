import { Router } from "express";
const router = Router();

import { getTestcases, getTestcase, updateTestcase, deleteTestcase, addTestcase } from "../controller/testcase.js";


router.route('/api/testcase/:courseId/:levelId').get(getTestcases);
router.route('/api/testcase/:courseId/:levelId/:testcaseId').get(getTestcase);
router.route('/api/testcase/:courseId/:levelId/:testcaseId').put(updateTestcase);
router.route('/api/testcase/:courseId/:levelId/:testcaseId').delete(deleteTestcase);
router.route('/api/testcase/:courseId/:levelId').post(addTestcase);

export default router;
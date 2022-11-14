const express = require("express");
const router = express.Router();

const testcase = require("../controller/testcase");


router.route('/api/testcase/:courseId/:levelId').get(testcase.getTestcases);
router.route('/api/testcase/question/:levelId').get(testcase.getTestcase);
router.route('/api/testcase/:courseId/:levelId').post(testcase.addTestcase);

module.exports = router;
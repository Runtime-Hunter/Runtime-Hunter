const express = require("express");
const router = express.Router();

const testcase = require("../controller/testcase");


router.route('/api/testcase/question/all').get(testcase.getTestcases);
router.route('/api/testcase/question/:id').get(testcase.getTestcase);
router.route('/api/testcase/add').post(testcase.addTestcase);

module.exports = router;
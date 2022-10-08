const express = require("express");
const router = express.Router();

const testcase = require("../controller/testcase");


router.route('/api/testcase/all').get(testcase.getTestcases);
router.route('/api/testcase/:id').get(testcase.getTestcase);
router.route('/api/testcase/add').post(testcase.addTestcase);

module.exports = router;
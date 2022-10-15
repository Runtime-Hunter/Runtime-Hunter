const express = require("express");
const router = express.Router();

const submission = require("../controller/submission");


router.route('/api/submission/all').get(submission.getSubmissions);
router.route('/api/submission/:id').get(submission.getSubmission);
router.route('/api/submission/user').get(submission.getUserSubmissions);
router.route('/api/submission/userquestion').get(submission.getUserQuestionSubmission);
router.route('/api/submission/add').post(submission.addSubmission);

module.exports = router;
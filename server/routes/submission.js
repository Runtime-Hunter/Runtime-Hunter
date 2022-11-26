import { Router } from "express";
const router = Router();

import { getSubmissions, getSubmission, getUserSubmissions, getUserQuestionSubmission, addSubmission } from "../controller/submission.js";


router.route('/api/submission').get(getSubmissions);
router.route('/api/submission/:id').get(getSubmission);
router.route('/api/submission/user').post(getUserSubmissions);
router.route('/api/submission/userquestion').get(getUserQuestionSubmission);
router.route('/api/submission').post(addSubmission);

export default router;
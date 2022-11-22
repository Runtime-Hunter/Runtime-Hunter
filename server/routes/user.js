import { Router } from "express";
const router = Router();

import { signup, login, getCorrectlySolvedQuestions } from "../controller/user.js";

router.route('/api/signup').post(signup);
router.route('/api/login/:email').post(login);
router.route('/api/user/levels/:userId').get(getCorrectlySolvedQuestions)
export default router;
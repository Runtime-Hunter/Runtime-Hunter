const express = require("express");
import { signup, login, getCorrectlySolvedQuestions } from "../controller/auth.js";
const user = require("user")

const router = express.Router();

router.route('/api/signup').post(signup);
router.route('/api/login/:email').post(login);
router.route('/api/user/levels/:userId').get(getCorrectlySolvedQuestions)

router.route('/api/user/favorites').get(user.getFavs);
router.route('/api/user/favorites').post(user.addToFavs);
router.route('/api/user/favorites').delete(user.removeFromFavs);
export default router;

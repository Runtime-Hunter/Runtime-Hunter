import { Router } from "express";
import { signup, login, getCorrectlySolvedQuestions } from "../controller/auth.js";
import { getFavs, addToFavs, removeFromFavs } from "../controller/user.js"
const router = Router();

router.route('/api/signup').post(signup);
router.route('/api/login/:email').post(login);
router.route('/api/user/levels/:userId').get(getCorrectlySolvedQuestions)

router.route('/api/user/favorites').get(getFavs);
router.route('/api/user/favorites').post(addToFavs);
router.route('/api/user/favorites').delete(removeFromFavs);
export default router;

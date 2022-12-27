import { Router } from "express";
const router = Router();

import { getLevels, getLevel, bulkGetLevels, addLevel, deleteLevel, updateLevel } from "../controller/level.js";


router.route('/api/level/:courseId').get(getLevels);
router.route('/api/level/:courseId/:levelId').get(getLevel);
router.route('/api/levels/user').post(bulkGetLevels)
router.route('/api/level').post(addLevel);
router.route('/api/level').delete(deleteLevel);
router.route('/api/level').put(updateLevel);


export default router;
import { Router } from "express";
const router = Router();

import { getLevels, getLevel, bulkGetLevels, addLevel } from "../controller/level.js";


router.route('/api/level/:courseId').get(getLevels);
router.route('/api/level/:courseId/:levelId').get(getLevel);
router.route('/api/levels/user').post(bulkGetLevels)
router.route('/api/level').post(addLevel);

export default router;
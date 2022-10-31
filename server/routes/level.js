const express = require("express");
const router = express.Router();

const levels = require("../controller/level");


router.route('/api/level/:courseId/all').get(levels.getLevels);
router.route('/api/level/:courseId/:levelId').get(levels.getLevel);
router.route('/api/level/add').post(levels.addLevel);

module.exports = router;
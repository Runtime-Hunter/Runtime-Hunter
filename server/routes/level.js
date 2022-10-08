const express = require("express");
const router = express.Router();

const levels = require("../controller/level");


router.route('/api/levels/all').get(levels.getLevels);
router.route('/api/levels/:id').get(levels.getLevel);
router.route('/api/levels/add').post(levels.addLevel);

module.exports = router;
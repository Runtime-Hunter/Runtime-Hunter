const express = require("express");
const router = express.Router();

const user = require("../controller/user");

router.route('/api/user/favorites').get(user.getFavs);
router.route('/api/user/favorites').post(user.addToFavs);
router.route('/api/user/favorites').delete(user.removeFromFavs);
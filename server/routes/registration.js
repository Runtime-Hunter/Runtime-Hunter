const express = require("express");
const router = express.Router();

const registration = require("../controller/registration");

router.route('/api/signup').post(registration.signup);
router.route('/api/login/:email').post(registration.login);
module.exports = router;
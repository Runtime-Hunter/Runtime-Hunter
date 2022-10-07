const express = require("express");
const router = express.Router();

const registration = require("../controller/registration");


router.route('/signup').post(registration.signup);
router.route('/login/:email').post(registration.login);
module.exports = router;
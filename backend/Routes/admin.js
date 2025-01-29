const express = require('express');
const {  getAllUserController, getAllDoctorsController, changeAccount } = require('../controllers/admin');
const { isAuthenticated } = require('../middelwares/auth');

const router = express.Router();

router.route('/getAllUsers').get(isAuthenticated, getAllUserController);
router.route('/getAllDoctors').get(isAuthenticated,getAllDoctorsController);
router.route("/changeAccount").post(isAuthenticated,changeAccount);

module.exports = router;
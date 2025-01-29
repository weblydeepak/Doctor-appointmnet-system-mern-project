const express = require('express');
const { Register, Login, getUser, applyDoctor, getAllNotificationController, deleteAllNotification, getaAllAproveDoc, bookeDocAppointmnet, bookingAvailability, userAppointments } = require("../controllers/user");
const { isAuthenticated } = require('../middelwares/auth');
const router = express.Router();

router.route('/register').post(Register);
router.route('/Login').post(Login);
router.route('/getUser').get(isAuthenticated,getUser);
router.route('/applyDoctor').post(isAuthenticated, applyDoctor);
router.route('/getNotification').post(isAuthenticated,getAllNotificationController);
router.route('/deleteAllNotification').post(isAuthenticated,deleteAllNotification);
router.route('/getaAllAproveDoc').get(isAuthenticated, getaAllAproveDoc);
router.route('/bokking-appointment').post(isAuthenticated,bookeDocAppointmnet);
router.route('/bookingAvailability').post(isAuthenticated,bookingAvailability);
router.route('/userAppointments').get(isAuthenticated,userAppointments )

module.exports = router;
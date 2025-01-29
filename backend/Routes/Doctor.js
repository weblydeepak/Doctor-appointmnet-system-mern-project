const express = require('express');

const { isAuthenticated } = require('../middelwares/auth');
const { getDoctorInfoController, updateProfileController, getDoctorByIdController, DocAppointments, updateStatusController,  } = require('../controllers/Doctor');

const router = express.Router();

router.route("/getDoctorsInfo").get(isAuthenticated,getDoctorInfoController);
router.route("/updateDoctorInfo").post(isAuthenticated, updateProfileController);
router.route("/getDocById").post(isAuthenticated, getDoctorByIdController);
router.route("/DocAppointment").get(isAuthenticated, DocAppointments);
router.route("/updateStatusController").post(isAuthenticated,updateStatusController );

module.exports = router;
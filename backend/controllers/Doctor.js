const appointmentModel = require("../Models/appoitmentModel");
const doctorModel = require("../Models/DocModel");
const Usermodel = require("../Models/userModel");



exports.getDoctorInfoController = async (req, res) => {
  try {
    
      const userId = req.user._id;
    //  console.log(userId, "userId");
    
    const doctor = await doctorModel.findOne({ userId });     
            res.status(200).send({
                success: true,
                message: "doctor data fetch success",
                data: doctor,
            });
      
  } catch (error) { 
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message:`internal error ${error}`,
    });
  }
};

// update doc profile
exports.updateProfileController = async (req, res) => {
  try {
    const doctor = await doctorModel.findOneAndUpdate({ userId: req.user._id},req.body);
    res.status(201).send({
      success: true,
      message: "Doctor Profile Updated",
      data: doctor,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Doctor Profile Update issue",
      error,
    });
  }
};



exports.getDoctorByIdController = async (req, res) => {
  try {
    console.log(req.body.doctorId);
    const doctor = await doctorModel.findOne({ _id: req.body.doctorId });
    // console.log(doctor, "doctor");
    
    // const doctor = await doctorModel.findById(req.params.id);
    res.status(200).send({
      success: true,
      message: "Sigle Doc Info Fetched",
      data: doctor,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message:`internal error ${error}`,
    });
  }
};



exports.DocAppointments = async (req, res) => {
  try {
    // console.log(req.user._id);

    const doctor = await doctorModel.findOne({ userId: req.user._id});
    // console.log(doctor,"doctor");
    
    const appointments =  await appointmentModel.find({ doctorId: doctor._id, });
    // console.log(appointments,"appointments");
    

    res.status(200).send({
      success: true,
      message: "Appointment Booked Successfully",
      data: appointments,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message:`internal error ${error}`,
    });
  }
}


exports.updateStatusController = async (req, res) => {
  try {
    const { appointmentsId, status } = req.body;
    const appointments = await appointmentModel.findByIdAndUpdate(
      appointmentsId,
      { status }
    );
    const user = await Usermodel.findOne({ _id: appointments.userId });
    const notification = user.notification;
    notification
    .push({
      type: "status-updated",
      message: `your appointment has been updated ${status}`,
      onCLickPath: "/doctor-appointments",
    });
    await user.save();
    res.status(200).send({
      success: true,
      message: "Appointment Status Updated",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error In Update Status",
    });
  }
};
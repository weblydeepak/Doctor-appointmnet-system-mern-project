const doctorModel = require("../Models/DocModel");
const Usermodel = require("../Models/userModel");

exports.getAllUserController= async(req,res)=>{
    try {
        const user = await Usermodel.find({});
       res.status(200).json({
        success: true,
        data: user
       })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

exports.getAllDoctorsController = async(req,res)=>{
    try {
        const doc = await doctorModel.find({});
       res.status(200).json({
        success: true,
        data: doc
       })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

exports.changeAccount = async (req, res) => {
    try {
      const { doctorId, status } = req.body;
      
      const doctor = await doctorModel.findByIdAndUpdate(doctorId, { status });
    
      const user = await Usermodel.findOne({ _id: doctor.userId });
      console.log(user,"user details");
      
      const notification = user.notification;
      notification.push({
        type: "doctor-account-request-updated",
        message: `Your Doctor Account Request Has ${status} `,
        onClickPath: "/notification",
      });
      user.isDoctor === "approved" ? true : false;
      await user.save();
      res.status(201).send({
        success: true,
        message: "Account Status Updated",
        data: doctor,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Eror in Account Status",
        error,
      });
    }
  };
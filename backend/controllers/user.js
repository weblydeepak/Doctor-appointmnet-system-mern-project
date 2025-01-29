const Usermodel = require('../Models/userModel');
const bcrypt = require("bcryptjs")
const jwt = require('jsonwebtoken');
const doctorModel = require('../Models/DocModel');
const appointmentModel = require('../Models/appoitmentModel');
const moment = require('moment');
exports.Register= async (req,res)=>{
    try {
        const {name,email,password}= req.body;
        let user = await Usermodel.findOne({email});
        if(user){
            return res.status(400).json({
                message: 'Email already exists'
            })
        }
        console.log(name , email);
        
        const Passsword = await bcrypt.hash(password,10);
        user = await Usermodel.create({name,email,password:Passsword})
        res.status(201).json({
            success: true,
            message: 'User registered successfully',
            user
        })
    } catch (error) {
        res.status(500).json({
            message: `internal error${error}`
        })
    }
}


exports.Login =  async(req,res)=>{
    try {
        const {email,password}= req.body;
        const user = await Usermodel.findOne({email}).select("+password");
    
        if(!user){
            return res.status(400).json({
                success: false,
                message: 'User not found'
            })
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({
                success: false,
                message: 'Incorrect password'
            })
        }

     const token = jwt.sign({ _id: user._id }, process.env.SECKEY);
    
     user.password= undefined;
     
     res.status(200).cookie("token", token ).json({
        success: true,
        user: user
      });

    } catch (error) {
        res.status(500).json({
            success:false,
            message: `internal error ${error}`
        })
    }
}



exports.getUser = async(req,res)=>{
    try {
        const user = await Usermodel.findById(req.user._id)
        user.password= undefined;
        res.json({
            success: true,
            user:user
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message: `internal error ${error}`
        })
    }
}




exports.applyDoctor = async (req, res) => {
    try {
     
      const newDoctor = new doctorModel({ ...req.body, status: "pending" });
      await newDoctor.save();
  
      const adminUser = await Usermodel.findOne({ isAdmin: true });

  
      if (!adminUser) {
        return res.status(404).json({
          success: false,
          message: "Admin user not found",
        });
      }
  
      const notification = adminUser.notification || []; // Initialize if undefined
      notification.push({
        type: "doctor_application",
        message: `${newDoctor.firstName} ${newDoctor.lastName} has applied for a doctor account.`,
        data: {
          doctorId: newDoctor._id,
          name: `${newDoctor.firstName} ${newDoctor.lastName}`,
          onClickPath: "/admin/doctors",
        },
      });
  
      adminUser.notification = notification;
      await adminUser.save();
  
      res.status(200).json({
        success: true,
        message: "Doctor application submitted successfully",
        notification:notification
      });
    } catch (error) {
        console.log(error);
        
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };
  


 exports.getAllNotificationController = async (req, res) => {
    try {
      const user = await Usermodel.findById(req.user._id)
      // console.log(user,"user");
      
      const notification = user.notification;
      // console.log(notifcation,"notifcation");
      
      const seennotification = user.seennotification;
      // console.log(seennotification,"seennotification");

      seennotification.push(...notification);
      user.notification = [];
      user.seennotification = notification;
      const updatedUser = await user.save();
      res.status(200).send({
        success: true,
        message: "all notification marked as read",
        data: updatedUser,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        message:error.message,
        success: false,
        error,
      });
    }
  };
  
  // delete notifications
  exports.deleteAllNotification = async (req, res) => {
    try {
      const user = await Usermodel.findById(req.user._id)
      user.notification = [];
      user.seennotification = [];
      const updatedUser = await user.save();
      updatedUser.password = undefined;
      res.status(200).send({
        success: true,
        message: "Notifications Deleted successfully",
        data: updatedUser,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "unable to delete all notifications",
        error,
      });
    }
  };
  
  exports.getaAllAproveDoc = async (req, res) => {
    try {
      const doc = await doctorModel.find({ status: "approved" });
      // console.log(doc, "doctor");
      
      res.status(200).json({
        success: true,
        data: doc,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  exports.bookeDocAppointmnet = async (req, res) => {
    try {

    req.body.date = moment(req.body.date, "DD-MM-YYYY").toISOString();
    req.body.time = moment(req.body.time, "HH:mm").toISOString();
    req.body.status = "pending";
      console.log(req.body,"this is booked appointment data");
      const user = await Usermodel.findById({_id: req.body.doctorInfo.userId});
      console.log(user, "user");
      
      const newAppointment = new appointmentModel(req.body);

      await newAppointment.save();
      user.notification.push({
        type: "New-appointment-request",
        message: `A new appointment request from ${req.body.userInfo?.name}`,
        onClickPath: "/user/appointments",
      });
  
      await user.save();
      res.status(200).send({
        success: true,
        message: "Appointment Book succesfully",
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        error,
        message: error.message,
      });
    }
  };
  
 exports.bookingAvailability= async (req, res) => {
    try {
      const date = moment(req.body.date, "DD-MM-YY").toISOString();
      const fromTime = moment(req.body.time, "HH:mm")
        .subtract(1, "hours")
        .toISOString();
      const toTime = moment(req.body.time, "HH:mm").add(1, "hours").toISOString();
      const doctorId = req.body.doctorId;
      const appointments = await appointmentModel.find({
        doctorId,
        date,
        time: {
          $gte: fromTime,
          $lte: toTime,
        },
      });
      if (appointments.length > 0) {
        return res.status(200).send({
          message: "Appointments not Availibale at this time",
          success: true,
        });
      } else {
        return res.status(200).send({
          success: true,
          message: "Appointments available",
        });
      }
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        error,
        message: "Error In Booking",
      });
    }
  };




  exports.userAppointments = async (req, res) => {
    try {
      const appointments = await appointmentModel.find({
        userId: req.user._id,
      });
      res.status(200).send({
        success: true,
        data: appointments,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        error,
        message: "Error In Fetching Appointments",
      });
    }
  }
  
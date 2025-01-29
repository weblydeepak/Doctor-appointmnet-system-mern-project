
const User = require('../Models/userModel');
const jwt = require('jsonwebtoken');

exports.isAuthenticated = async (req, res, next) => {
  try {

    
    const {token}  = req.cookies;
    
    
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Token not provided',
      });
    }

    const decoded = jwt.verify(token, process.env.SECKEY);

    const user = await User.findById(decoded._id);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'User not found',
      });
    }

    req.user = user;

    next();
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


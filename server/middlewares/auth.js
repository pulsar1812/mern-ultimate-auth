const expressJwt = require('express-jwt');

const User = require('../models/User');

exports.requireSignin = expressJwt({
  secret: process.env.JWT_SECRET,
});

exports.adminMiddleware = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(400).json({
        error: 'User not found',
      });
    }

    if (user.role !== 'admin') {
      return res.status(400).json({
        error: 'Admin only. Access denied.',
      });
    }

    req.profile = user;
    next();
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

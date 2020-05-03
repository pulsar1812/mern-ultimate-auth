const User = require('../models/User');

// @desc    Get one user
// @route   GET /api/user/:id
// @access  Public
exports.getUser = async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await User.findById(userId).select('-hashed_password -salt');
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

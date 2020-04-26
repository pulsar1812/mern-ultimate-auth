const User = require('../models/User');

// @desc    Signing up user
// @route   POST /api/auth/signup
// @access  Public
// exports.signup = async (req, res) => {
//   const { name, email, password } = req.body;

//   try {
//     let user = await User.findOne({ email });

//     if (user) {
//       return res.status(400).json({ error: 'Email is taken.' });
//     }

//     let newUser = new User({ name, email, password });

//     await newUser.save();

//     res.json({
//       message: 'Signup Success! Please Sign in.',
//     });
//   } catch (err) {
//     console.log('Signup Error', err);
//     return res.status(400).json({ error: err });
//   }
// };

// @desc    Signing up user
// @route   POST /api/auth/signup
// @access  Public
exports.signup = async (req, res) => {};

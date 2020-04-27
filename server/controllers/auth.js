const jwt = require('jsonwebtoken');
const sendgridMail = require('@sendgrid/mail');

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
exports.signup = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ error: 'Email is taken.' });
    }

    sendgridMail.setApiKey(process.env.SENDGRID_API_KEY);

    const token = jwt.sign(
      { name, email, password },
      process.env.JWT_ACCOUNT_ACTIVATION,
      { expiresIn: 360000 } // 100 hours for testing purpose
    );

    const emailData = {
      from: process.env.EMAIL_FROM,
      to: email,
      subject: `Account activation link`,
      html: `
        <h1>Please use the following link to activate your account</h1>
        <p>${process.env.CLIENT_URL}/auth/activate</p>
        <hr />
        <p>This email may contain sensitive information</p>
        <p>${process.env.CLIENT_URL}</p>
      `,
    };

    const sent = await sendgridMail.send(emailData);

    if (!sent) {
      return res.status(400).json({ message: 'Signup email not sent' });
    }

    res.json({
      message: `Email has been sent to ${email}. Follow the instruction to activate your account.`,
    });
  } catch (err) {
    console.log('Signup Error', err);
    return res.status(400).json({ error: err });
  }
};

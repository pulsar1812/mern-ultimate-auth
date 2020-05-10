const jwt = require('jsonwebtoken');
const sendgridMail = require('@sendgrid/mail');

const User = require('../models/User');

// @desc    Signing up user
// @route   POST /api/auth/signup
// @access  Public
exports.signup = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    // Check if user already exists
    if (user) {
      return res.status(400).json({ error: 'Email is taken.' });
    }

    sendgridMail.setApiKey(process.env.SENDGRID_API_KEY);

    const token = jwt.sign(
      { name, email, password },
      process.env.JWT_ACCOUNT_ACTIVATION,
      { expiresIn: '3d' } // 3d for testing purpose
    );

    const emailData = {
      from: process.env.EMAIL_FROM,
      to: email,
      subject: `Account activation link`,
      html: `
        <h1>Please use the following link to activate your account</h1>
        <p>${process.env.CLIENT_URL}/auth/activate/${token}</p>
        <hr />
        <p>This email may contain sensitive information</p>
        <p>${process.env.CLIENT_URL}</p>
      `,
    };

    const sent = await sendgridMail.send(emailData);

    if (!sent) {
      return res.status(400).json({ error: 'Signup email sent error' });
    }

    res.json({
      message: `Email has been sent to ${email}. Follow the instruction to activate your account.`,
    });
  } catch (err) {
    console.log('Signup Error', err);
    return res.status(400).json({ error: err });
  }
};

// @desc    Activate an account
// @route   POST /api/auth/account-activation
// @access  Public
exports.accountActivation = async (req, res) => {
  const { token } = req.body;

  // Make sure token exists
  if (!token) {
    return res.status(401).json({ error: 'There is no activation token.' });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_ACCOUNT_ACTIVATION);

    const { name, email, password } = decoded;

    const user = new User({ name, email, password });

    await user.save();

    res.json({
      message: 'Signup Success. Please Sign in.',
    });
  } catch (err) {
    console.log('Account Activation Error', err);
    res.status(401).json({
      error: 'Error saving user in database. Try signup again.',
    });
  }
};

// @desc    Signing in user
// @route   POST /api/auth/signin
// @access  Public
exports.signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user exists
    let user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ error: 'User does not exist.' });
    }

    // Check if authenticated
    if (!user.authenticate(password)) {
      return res.status(400).json({
        error: 'Email and password do not match',
      });
    }

    // Generate token and send to client
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });

    res.json({
      token,
      user,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @desc    Forgot Password
// @route   PUT /api/auth/forgot-password
// @access  Public
exports.forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        error: 'User with that email does not exist',
      });
    }

    const token = jwt.sign({ _id: user._id }, process.env.JWT_RESET_PASSWORD, {
      expiresIn: '10m',
    });

    const emailData = {
      from: process.env.EMAIL_FROM,
      to: email,
      subject: `Password Reset Link`,
      html: `
        <h1>Hi, we have received a request to reset your password. 
        If you did not make the request, just ignore this email. Otherwise, 
        you can reset your password using this link:</h1>
        <p>${process.env.CLIENT_URL}/auth/password-reset/${token}</p>
        <p>This email may contain sensitive information</p>
        <p>${process.env.CLIENT_URL}</p>
      `,
    };

    const sent = await sendgridMail.send(emailData);

    if (!sent) {
      return res.status(400).json({ error: 'Reset email sent error' });
    }

    res.json({
      message: `Email has been sent to ${email}. Follow the instruction to reset your account.`,
    });
  } catch (err) {
    console.log('Reset Error', err);
    return res.status(400).json({ error: err });
  }
};

// @desc    Reset Password
// @route   PUT /api/auth/reset-password
// @access  Private
exports.resetPassword = async (req, res) => {};

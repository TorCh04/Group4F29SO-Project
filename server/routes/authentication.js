const express = require('express');
const bcrypt = require('bcrypt');
const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Adjust the path as necessary
const verifyToken = require('../middleware/verifyToken'); // Adjust the path as necessary
const JWT_SECRET = process.env.JWT_SECRET || 'default_secret_key';

const router = express.Router();

// Registration endpoint
router.post('/register',
  [
    body('email').isEmail().normalizeEmail(),
    body('password'),
    body('confirmPassword').custom((value, { req }) => {
      if (value !== req.body.password) throw new Error('Passwords mismatch');
      return true;
    })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    try {
      const { email, firstName, lastName, password, securityQuestion, securityAnswer } = req.body;
      
      if (req.body.password.length < 6) {
        return res.status(501).json({ message: 'Password must be at least 6 characters long' });
      }

      if (req.body.securityQuestion == "") {
        return res.status(502).json({ message: 'Please choose a security question' });
      }

      if (await User.findOne({ email })) {
        return res.status(400).json({ message: 'Email already exists' });
      }

      const user = new User({ email, firstName, lastName, password, securityQuestion, securityAnswer });
      await user.save();
      res.status(201).json({ message: 'Registration successful' });
    } catch (error) {
      console.error('Registration error:', error);
      res.status(500).json({ message: 'Server error during registration' });
    }
  }
);

// Login endpoint
router.post('/login',
  [
    body('email').isEmail().normalizeEmail(),
    body('password').notEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });

      if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      // Generate JWT token
      const token = jwt.sign(
        { id: user._id, email: user.email }, 
        JWT_SECRET, 
        { expiresIn: '1d' }
      );

      res.json({ 
        message: 'Login successful',
        token,
        user: {
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName
        }
      });
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ message: 'Server error during login' });
    }
  }
);

// Dashboard endpoint
router.get('/dashboard', verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password'); // Exclude password

    if (!user) return res.status(404).json({ message: 'User not found' });

    res.json({ 
      message: 'Dashboard data retrieved successfully',
      userData: user
    });
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    res.status(500).json({ message: 'Server error while fetching dashboard data' });
  }
});


// Forgot password endpoint
router.post('/verifyEmail', 
  [
    body('email').isEmail().normalizeEmail(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    try {
      const { email } = req.body;
      
      if (await User.findOne({ email })) {
        return res.status(201).json({ message: 'Email already exists' });
      }


    } catch (error) {
      console.error('Email verification error:', error);
      res.status(500).json({ message: 'Server error during email verification' });
    }
  }
);

router.get('/getSecurityQA', async (req, res) => {
  try {
    const user = await User.findOne({ email: req.query.email });
    
    // .select('securityQuestion securityAnswer'); 

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ 
      message: 'Security questions retrieved successfully',
      securityQuestion: user.securityQuestion,
      securityAnswer: user.securityAnswer
    });
  } catch (error) {
    console.error('Error fetching security questions:', error);
    res.status(500).json({ message: 'Server error while fetching security question' });
  }
});



router.post('/resetPassword', async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    if (!password) {
      return res.status(400).json({ message: 'Password is required' });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const update = { password: hashedPassword };

    await User.findOneAndUpdate({ _id: user._id }, update);

    return res.status(201).json({ message: 'Password updated successfully' });
  } catch (error) {
    console.error('Error updating password:', error);
    res.status(500).json({ message: 'Server error while updating password' });
  }
});


module.exports = router;
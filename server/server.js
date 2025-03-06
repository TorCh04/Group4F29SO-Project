const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const cors = require('cors');
const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const JWT_SECRET = 'super_secret_key'; // In production, use an environment variable

// Initialize Express app
const app = express();

// Middleware setup
app.use(express.json()); // Allow parsing of JSON request bodies
app.use(cors({
    origin: "http://localhost:5173", // Localhosting Port
    methods: ["POST", "GET"] // Allow needed methods
}));

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/f29so')
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// User schema and model
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  password: { type: String, required: true }
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

const User = mongoose.model('User', userSchema);

// Device schema and model
const deviceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, required: true }
});

const Device = mongoose.model('Device', deviceSchema);

// JWT token verification middleware
function verifyToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).json({ message: 'Unauthorized - No token provided' });

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ message: 'Forbidden - Invalid token' });
    req.user = decoded; // Attach decoded payload (user ID & email) to request
    next();
  });
}

// Routes
// Registration endpoint
app.post('/register',
  [
    body('email').isEmail().normalizeEmail(),
    body('password').isLength({ min: 6 }),
    body('confirmPassword').custom((value, { req }) => {
      if (value !== req.body.password) throw new Error('Passwords mismatch');
      return true;
    })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    try {
      const { email, firstName, lastName, password } = req.body;
      
      if (await User.findOne({ email })) {
        return res.status(400).json({ message: 'Email already exists' });
      }

      const user = new User({ email, firstName, lastName, password });
      await user.save();
      res.status(201).json({ message: 'Registration successful' });
    } catch (error) {
      console.error('Registration error:', error);
      res.status(500).json({ message: 'Server error during registration' });
    }
  }
);

// Login endpoint
app.post('/login',
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
        { expiresIn: '1h' }
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
app.get('/dashboard', verifyToken, async (req, res) => {
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

//Leaderboard
const leaderboardRoutes = require("./leaderboard_stats"); // Import leaderboard routes
app.use("/api", leaderboardRoutes);


// Updating Profile
app.post('/update-profile',
  [
    body('firstName').trim().escape(),
    body('lastName').trim().escape(),
    body('password').isLength({ min: 6 }),
    body('confirmPassword').custom((value, { req }) => {
      if (value !== req.body.password) throw new Error('Passwords mismatch');
      return true;
    })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    try {
      const { firstName, lastName, password } = req.body;
      const userId = req.user._id; // assuming you have a middleware that sets req.user

      const user = await User.findById(userId);
      if (!user) return res.status(404).json({ message: 'User not found' });

      user.firstName = firstName;
      user.lastName = lastName;
      user.password = password;

      await user.save();
      res.status(200).json({ message: 'Profile updated successfully' });
    } catch (error) {
      console.error('Update profile error:', error);
      res.status(500).json({ message: 'Server error during update' });
    }
  }
);

// app.post('/update-name',
//   [
//     body('firstName').trim().escape(),
//     body('lastName').trim().escape(),
//   ],
//   async (req, res) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

//     try {
//       const token = localStorage.getItem('token');
//       const decoded = jwt.verify(token, JWT_SECRET);
//       const user = await User.findById(decoded.id).select('-password');
//       const { firstName, lastName } = req.body;

//       if (!user) return res.status(404).json({ message: 'User not found' });

//       user.firstName = firstName;
//       user.lastName = lastName;

//       await user.save();
//       res.status(200).json({ message: 'Name updated successfully' });
//     } catch (error) {
//       console.error('Update name error:', error);
//       res.status(500).json({ message: 'Server error during update' });
//     }
//   }
// );



// Settings test route
// app.post('/updateName',
//   [
//     body('firstName'),
//     body('lastName')
//   ],
//   async (req, res) => {
//   try {
//     const token = localStorage.getItem('token');
//     const decoded = jwt.verify(token, JWT_SECRET);
//     console.log(decoded.id);
//     // const filter = { _id: decoded.id };
//     // const update = { firstName: req.body.firstName, lastName: req.body.lastName };

//     // res = await User.findOneAndUpdate(filter, update, {
//     //   new: true
//     // });

//     res = decoded.id;
//   } catch (error) {
//     console.error('Error fetching user:', error);
//     res.status(500).json({ message: 'Server error while fetching user' });
//   }
// });

app.post('/updateName', verifyToken,  async (req, res) => {
  try {
    const filter = { _id: req.user.id };
    const update = { firstName: req.body.firstName, lastName: req.body.lastName };

    const user = await User.findOneAndUpdate(filter, update, {
      new: true
    });
    res.json({ message: 'Name updated successfully', user });
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ message: 'Server error while fetching user' });
  }
});


// Start server
const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


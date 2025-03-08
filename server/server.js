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

// Device schema and model
const deviceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  status: { type: String, required: true },
});

const Device = mongoose.model('Device', deviceSchema);


// Schedule schema and model
const scheduleSchema = new mongoose.Schema({
  name: { type: String, required: true },
  device: { type: String, required: true },
  instructions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Instruction' }],
});

const Schedule = mongoose.model('Schedule', scheduleSchema);


// Instructions schema and model
const instructionsSchema = new mongoose.Schema({
  insruction: { type: String, required: true }
});

const Instruction = mongoose.model('Instruction', instructionsSchema);


// User schema and model
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  password: { type: String, required: true },
  devices: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Device' }],
  schedules: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Schedule' }]
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

const User = mongoose.model('User', userSchema);


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

// Devices

app.post('/addDevice', verifyToken, async (req, res) => {
  try {
    const newDevice = new Device({
      name: req.body.name,
      type: req.body.type,
      status: req.body.status
    });

    await newDevice.save();

    // Add the new device to the user's devices array
    const user = await User.findById(req.user.id);
    user.devices.push(newDevice._id);
    await user.save();

    res.status(201).json({ message: 'Device added successfully', device: newDevice });
  } catch (error) {
    console.error('Error adding device:', error);
    res.status(500).json({ message: 'Server error while adding device' });
  }
});

app.post('/removeDevice', verifyToken, async (req, res) => {
  try {
    const deviceId = req.body.deviceId;

    // Remove the device from the user's devices array
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { $pull: { devices: deviceId } },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    await Device.findByIdAndDelete(deviceId);

    res.status(200).json({ message: 'Device removed successfully', user });
  } catch (error) {
    console.error('Error removing device:', error);
    res.status(500).json({ message: 'Server error while removing device' });
  }
});

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



///////////
//Devices//
///////////

// Add a device endpoint
// app.post('/devices', async (req, res) => {
//   try {
//     const { name, image } = req.body;
//     const device = new Device({ name, image });
//     await device.save();
//     res.status(201).json({ message: 'Device added successfully', device });
//   } catch (error) {
//     console.error('Error adding device:', error);
//     res.status(500).json({ message: 'Server error while adding device' });
//   }
// });

// // Fetch all devices endpoint
// app.get('/devices', async (req, res) => {
//   try {
//     const devices = await Device.find();
//     res.status(200).json({ devices });
//   } catch (error) {
//     console.error('Error fetching devices:', error);
//     res.status(500).json({ message: 'Server error while fetching devices' });
//   }
// });

// // Schedule schema and model
// const scheduleSchema = new mongoose.Schema({
//   room: { type: String, required: true },
//   device: { type: String, required: true },
//   action: { type: String, required: true },
//   time: { type: String, required: true }
// });

// const Schedule = mongoose.model('Schedule', scheduleSchema);

// // Add a schedule endpoint
// app.post('/schedules', async (req, res) => {
//   try {
//     const { room, device, action, time } = req.body;
//     const schedule = new Schedule({ room, device, action, time });
//     await schedule.save();
//     res.status(201).json({ message: 'Schedule added successfully', schedule });
//   } catch (error) {
//     console.error('Error adding schedule:', error);
//     res.status(500).json({ message: 'Server error while adding schedule' });
//   }
// });

// // Fetch all schedules endpoint
// app.get('/schedules', async (req, res) => {
//   try {
//     const schedules = await Schedule.find();
//     res.status(200).json({ schedules });
//   } catch (error) {
//     console.error('Error fetching schedules:', error);
//     res.status(500).json({ message: 'Server error while fetching schedules' });
//   }
// });

///////////////
//Devices end//
///////////////


// Start server
const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const { body, validationResult } = require('express-validator');
const path = require('path');

// Load environment variables from .env file
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.urlencoded({ extended: true })); // To parse URL-encoded bodies (for form data)
app.use(express.json()); // To parse JSON bodies (if you were to use API endpoints)
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files (CSS, JS)

// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected successfully'))
.catch(err => console.error('MongoDB connection error:', err));

// User Schema (models/User.js - can be in a separate file for larger apps)
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        match: /^\S+@\S+\.\S+$/ // Basic email regex validation
    },
    password: {
        type: String,
        required: true,
        minlength: 6 // Enforce minimum password length
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const User = mongoose.model('User', userSchema);

// Routes

// Display registration form
app.get('/register', (req, res) => {
    res.render('register', { errors: [], successMessage: '' });
});

// Handle registration submission
app.post(
    '/register',
    [
        // Input validation using express-validator
        body('username')
            .trim()
            .notEmpty().withMessage('Username is required.')
            .isLength({ min: 3 }).withMessage('Username must be at least 3 characters long.'),
        body('email')
            .trim()
            .notEmpty().withMessage('Email is required.')
            .isEmail().withMessage('Please enter a valid email address.')
            .normalizeEmail(), // Sanitize email
        body('password')
            .notEmpty().withMessage('Password is required.')
            .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long.'),
        body('confirm_password').custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error('Passwords do not match.');
            }
            return true;
        })
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.render('register', { errors: errors.array(), successMessage: '' });
        }

        const { username, email, password } = req.body;

        try {
            // Check if user already exists
            let user = await User.findOne({ email });
            if (user) {
                return res.render('register', { errors: [{ msg: 'Email already registered.' }], successMessage: '' });
            }

            // Hash password
            const salt = await bcrypt.genSalt(10); // Generate a salt with 10 rounds
            const hashedPassword = await bcrypt.hash(password, salt);

            // Create new user
            user = new User({
                username,
                email,
                password: hashedPassword,
            });

            // Save user to database
            await user.save();

            // Redirect or render success message
            res.render('register', { successMessage: 'Registration successful!', errors: [] });
            <a href="layout.html"></a>


        } catch (err) {
            console.error('Registration error:', err);
            // Check for duplicate key error (e.g., if username is also unique)
            if (err.code === 11000) {
                 return res.render('register', { errors: [{ msg: 'Username or Email already exists.' }], successMessage: '' });
            }
            res.render('register', { errors: [{ msg: 'Server error, please try again later.' }], successMessage: '' });
        }
    }
);

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}/register`);
});
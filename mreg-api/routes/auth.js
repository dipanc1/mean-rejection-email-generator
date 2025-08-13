const express = require('express');
const router = express.Router();

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

const UserTable = require('../models/User.js');
const UserVerified = require('../models/UserVerified.js');

require('dotenv').config();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
    },
    tls: {
        rejectUnauthorized: false
    }
});

// Register new user
router.post('/register', async (req, res) => {
    try {
        if (!req.body.email || !req.body.password || !req.body.firstName || !req.body.lastName) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const { firstName, lastName, email, password } = req.body;

        // Check if user already exists
        let user = await UserTable.findOne({ email });
        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user
        user = new UserTable({
            firstName,
            lastName,
            email,
            password: hashedPassword
        });

        await user.save();

        // Create verification record
        const verificationRecord = new UserVerified({
            userId: user._id,
            isVerified: false
        });
        await verificationRecord.save();

        // Create verification token
        const verificationToken = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        // Send verification email
        const verificationUrl = `${process.env.URL}/api/auth/verify-email?token=${verificationToken}`;
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Verify Your Email',
            html: `
                <h1>Welcome to MREG!</h1>
                <p>Hi ${firstName},</p>
                <p>Please click the link below to verify your email address:</p>
                <a href="${verificationUrl}">Verify Email</a>
                <p>This link will expire in 1 hour.</p>
            `
        };

        await transporter.sendMail(mailOptions);

        // Create JWT token
        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.status(201).json({
            token,
            user: {
                id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email
            },
            message: 'Please check your email to verify your account'
        });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Login user
router.post('/login', async (req, res) => {
    try {
        if (!req.body.email || !req.body.password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }

        const { email, password } = req.body;

        // Check if user exists
        const user = await UserTable.findOne({ email });
        if (!user) {
            return res.status(400).json({
                success: false,
                message: 'Invalid credentials'
            });
        }

        // Check if email is verified
        const verificationStatus = await UserVerified.findOne({ userId: user._id });
        if (!verificationStatus || !verificationStatus.isVerified) {
            return res.status(403).json({
                success: false,
                message: 'Please verify your email before logging in'
            });
        }

        // Validate password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: 'Invalid credentials'
            });
        }

        // Create JWT token
        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.json({
            success: true,
            token,
            user: {
                id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email
            }
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
});

router.get('/verify-email', async (req, res) => {
    try {
        const { token } = req.query;

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Update verification status
        await UserVerified.findOneAndUpdate(
            { userId: decoded.userId },
            { isVerified: true }
        );

        res.json({ message: 'Email verified successfully' });
    } catch (error) {
        console.error('Verification error:', error);
        res.status(400).json({ message: 'Invalid or expired verification token' });
    }
});

module.exports = router;
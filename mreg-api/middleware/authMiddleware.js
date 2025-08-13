const jwt = require('jsonwebtoken');
const UserTable = require('../models/user');
const UserVerified = require('../models/userVerified');

const protect = async (req, res, next) => {
    try {
        // Get token from header
        const token = req.header('Authorization')?.replace('Bearer ', '');

        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'No token, authorization denied'
            });
        }

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Find user by id
        const user = await UserTable.findById(decoded.userId)
            .select('-password');

        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'User not found'
            });
        }

        // Check if user is verified
        const verificationStatus = await UserVerified.findOne({ userId: user._id });
        if (!verificationStatus || !verificationStatus.isVerified) {
            return res.status(403).json({
                success: false,
                message: 'Account not verified'
            });
        }

        // Add user to request object
        req.user = user;
        next();

    } catch (error) {
        console.error('Auth middleware error:', error);
        return res.status(401).json({
            success: false,
            message: 'Token is not valid'
        });
    }
};

module.exports = protect;
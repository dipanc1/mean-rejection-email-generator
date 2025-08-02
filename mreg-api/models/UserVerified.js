const mongoose = require('mongoose');

const UserVerifiedSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true
    },
    isVerified: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

const UserVerified = mongoose.model('UserVerified', UserVerifiedSchema);

module.exports = UserVerified;
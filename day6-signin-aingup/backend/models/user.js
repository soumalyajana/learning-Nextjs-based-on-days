const mongoose = require('mongoose');

const newSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,   // ✅ should be 'required', not 'require'
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: true,   // ✅ fixed spelling
        unique: true
    },
    password: {
        type: String,
        required: true,   // ✅ fixed spelling
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true }); // ✅ correct option name is 'timestamps'

module.exports = mongoose.model('User', newSchema);

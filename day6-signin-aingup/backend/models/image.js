const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
    url: {
        type: String,
        required: true
    },
    publicId: {
        type: String,
        required: true
    },
    uploadedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true   // ✅ should be 'required', not 'require'
    }
}, { timestamps: true }); // ✅ correctly adds createdAt & updatedAt automatically

module.exports = mongoose.model('Image', imageSchema);

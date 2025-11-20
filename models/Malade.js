const mongoose = require('mongoose');

const maladeSchema = new mongoose.Schema({
    username: { 
        type: String, 
        required: true,
        trim: true
    },
    userlastname: { 
        type: String, 
        required: true,
        trim: true
    },
    phone: { 
        type: String, 
        required: true,
        trim: true
    },
    appointmentDate: { 
        type: String, 
        required: true 
    },
    appointmentTime: { 
        type: String, 
        required: true 
    },
    appointmentTimestamp: { 
        type: String, 
        required: true 
    },
    createdAt: { 
        type: Date, 
        default: Date.now 
    }
});

// Use a different collection name to avoid the unique constraint
module.exports = mongoose.model('malade', maladeSchema, 'appointments');
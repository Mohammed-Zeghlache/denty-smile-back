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

module.exports = mongoose.model('malade', maladeSchema, 'appointments');

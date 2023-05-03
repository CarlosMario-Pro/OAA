const mongoose = require('mongoose'); 


const subscribersSchema = new mongoose.Schema({ 
    name: { 
        type: String, required: true
    },
    email: { 
        type: String, required: true
    },
    phone: { 
        type: Number, required: true
    }
}); 


module.exports = mongoose.model('Subscribers', subscribersSchema);
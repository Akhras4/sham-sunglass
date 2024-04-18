
const mongoose = require('mongoose');

const userinfoSchema = new mongoose.Schema({
    street: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    postalCode: {
        type: String,
        required: true,
    },
    country: {
        type: String,
        required: true
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users', 
        required: true
    },
    name: {
        type: String,
        required: true
    }
   
});

const userinfo = mongoose.model('userinfo', userinfoSchema);

module.exports = userinfo
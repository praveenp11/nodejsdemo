const mongoose = require('mongoose');
const moment = require('moment');

var Schema = mongoose.Schema;

var customerSchema = new Schema({
    Id:{
        type: Number,
        required: true,
        default: parseInt(moment(new Date()).format('mmssSS'))
    },
    firstname:{
        type: String,
        required: true
    },
    lastname:{
        type: String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type: String,
        required: true
    },
    address:{
        type: String,
        required: true
    },
    update_timestamp:
    {
        type: Date,
        default: Date.now()
    }
});

var Customer = mongoose.model('customer', customerSchema);

module.exports = Customer;
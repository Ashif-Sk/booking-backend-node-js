const mongoose = require("mongoose");

const BookingSchema = mongoose.Schema({
    userId:{type:mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    activityId:{type:mongoose.Schema.Types.ObjectId, ref:'Activity', required: true},
    date:{type:Date,default:Date.now()}
});

module.exports = mongoose.model('Booking',BookingSchema);
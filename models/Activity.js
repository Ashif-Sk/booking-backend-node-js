const mongoose = require("mongoose");

const ActivitySchema = mongoose.Schema({
    title:String,
    description:String,
    location:String,
    date:String
});

module.exports = mongoose.model('Activity',ActivitySchema);
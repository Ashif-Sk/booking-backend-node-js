const express = require("express");
const mongoose = require("mongoose");
//const cors = require('cors');
require('dotenv').config();
const uri = 'mongodb+srv://skashif098:RsCJxPmS2nap5d6K@backend-project.fqbrhg5.mongodb.net/?retryWrites=true&w=majority&appName=backend-project';
const app = express();

const port = 5050;

//app.use(cors({
//    origin: 'http://localhost:8080',
//    credentials: true
//}));
app.use(express.json());

app.use('/api/auth',require('./routes/auth'));
app.use('/api/activities', require('./routes/activity'));
app.use('/api/bookings', require('./routes/booking'));

mongoose.connect(uri)
.then(()=> console.log('Mongoose connected'))
.catch(err => console.error(err));

app.listen(port,()=>{
    console.log(`Successfully connected to ${port}`);
});
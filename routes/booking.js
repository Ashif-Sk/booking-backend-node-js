const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const Activity = require('../models/Activity');
const jwt = require('jsonwebtoken');

function verifyUser(req,res,next){
    const authHeader = req.headers['authorization'];
    const token = authHeader?.split(' ')[1];

    if(!token){
        return res.status(400).json({msg : 'not authorised'});
    }
    try{
        const decoded = jwt.verify(token,process.env.Jwt_key);
        req.user = decoded.user;
        next();
    } catch(err){
        console.log('error in jwt verify');
    }
}

router.post('/:activityId',verifyUser,async (req,res)=>{
   const activityId = req.params.activityId;
   const userId = req.user.id;

   try{
        const activity = await Activity.findById(activityId);
        if(!activity){
            return res.status(400).json({msg : 'No activity'});
        }
        const booking = new Booking({ userId,activityId });
        await booking.save();
        res.status(201).json({msg : 'Booking is successful'});
   } catch (err){
    console.log('Booking error');
    res.status(400).json({error : err.message});
   }
});

router.get('/',verifyUser,async (req, res)=>{
    try{
        const bookings = await Booking.find({userId: req.user.id}).populate('activityId');
        res.json(bookings);
    } catch (err){
        console.log(err.message);
    }
});

module.exports = router;
const express = require('express');
const router = express.Router();
const Activity = require('../models/Activity');

router.post('/',async (req,res)=>{
    const {title,description,location,date} = req.body;
    try{
        activity = new Activity({title,description,location,date});
        const act = await activity.save();
        res.json(act);
        res.status(201).json({msg:'Activity created successfully'});
    } catch (err){
        console.log(err.message);
        res.status(400).json(err.message);
    }
});

router.get('/', async (req , res)=>{
    try{
        const activities = await Activity.find();
        res.json(activities);
    } catch (err){
        console.log(err.message);
    }
});

module.exports = router;
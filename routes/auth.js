const express = require("express");
const router =express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// for registration

router.post('/register',async (req,res)=>{
    const {name,email,pass,phone} = req.body;
    try{
        let user = await User.findOne({email});
        if(user) return res.status(400).json({msg: "User already exists"});
        user = new User({name,email,pass,phone});
        const salt = await bcrypt.genSalt(10);
        user.pass = await bcrypt.hash(pass,salt);

        await user.save();
        res.json({msg:'User registered'});
        const payload = {user: {id: user.id}};
        jwt.sign(payload,process.env.Jwt_key,{expiresIn:'1h'},(err,token)=>{
            if(err)throw err;
            res.json({token});
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('server error');
    }
});

//for login

router.post('/login',async (req,res)=>{
    const {email,pass} = req.body;
    try{
        const user = await User.findOne({email});
        if(!user) return res.status(400).json({msg: 'Invalid credentials'});
        const isMatch = await bcrypt.compare(pass,user.pass);
        if(!isMatch) return res.status(400).json({msg: 'Invalid credentials'});

        const payload = ({user:{id:user.id}});
        jwt.sign(payload,process.env.Jwt_key,{expiresIn : '1h'},(err,token) =>{
            if(err) console.log(err.message);
            res.json({token});
        });
    } catch(err){
        console.error(err.message);
    }
});

module.exports = router;
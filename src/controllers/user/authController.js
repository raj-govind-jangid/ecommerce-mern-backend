const express = require('express')
const app = express()
const User = require('../../models/user');
const bcrypt = require('bcrypt');
const saltRounds = 10;
let jwt = require('jsonwebtoken');
const privateJWTKey = process.env.JWT_SECRET_KEY
const { validationResult } = require('express-validator');
const { formatError } = require('../../helper/format');

exports.login = async (req,res)=>{
    try{
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ "status":false, "message": formatError(errors.array()) });
        }
        else{
            let userData = await User.findOne({'email':req.body.email}).lean();
            if(userData){
                let passwordCheck = await bcrypt.compareSync(req.body.password,userData.password);
                if(passwordCheck){
                    let token = jwt.sign({ userId: userData._id, userType: userData.userType }, privateJWTKey);
                    res.status(200).json({"status":true,"message":"Login SuccessFully",token})
                }
                else{
                    res.status(422).json({"status":false,"message":"Invalid Credentials"})
                }
            }
            else{
                res.status(422).json({"status":false,"message":"Invalid Credentials"})
            }
        }
        
    }
    catch(err){
        res.status(400).json({"status":false,"message":err.message})
    }
}

exports.register = async (req,res)=>{
    try{
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({"status": false,"message": formatError(errors.array()) });
        }
        else{
            let userData = await User.findOne({'email':req.body.email}).lean();
            if(userData == null){
                const hash = await bcrypt.hashSync(req.body.password, saltRounds);
                let user = {
                    fullname: req.body.fullname,
                    email: req.body.email,
                    password: hash,
                    userType: 1,
                }
                let newUser = new User(user);
                await newUser.save().then((data)=>{
                    res.status(201).json({"status":true,"message":"User Registed Sucessfully"})
                })
                .catch((err)=>{
                    res.status(400).json({"status":false,"message":err.message})
                })
            }
            else{
                res.status(422).json({"status":false,"message":"Email Id Already Exists"})    
            }
        }          
    }
    catch(err){
        res.status(400).json({"status":false,"message":err.message})
    }
}
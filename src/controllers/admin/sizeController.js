const express = require('express')
const app = express()
const Size = require('../../models/size');

exports.createSize = async (req,res)=>{
    try{
        if(req.body.hasOwnProperty("productId") && req.body.hasOwnProperty("name") && req.body.hasOwnProperty("status")){
            let size = {
                "name":req.body.name,
                "status":req.body.status
            }
            let newSize = new Size(size)
            await newSize.save().then((date)=>{
                res.status(200).json({"status":true,"message":"Create Successfully"})
            })
            .catch((err)=>{
                res.status(400).json({"status":false,"message":err})
            })
        }
        else{
            res.status(422).json({"status":false,"message":"Validation Error"})
        }
    }
    catch(err){
        res.status(400).json({"status":false,"message":err})
    }
}

exports.editSize = async (req,res)=>{
    try{
        if(req.params.hasOwnProperty("id") && req.body.hasOwnProperty("name") && req.body.hasOwnProperty("status")){
            let updateSize = {
                "name": req.body.name,
                "status": req.body.status,
            }
            await Size.findByIdAndUpdate(req.params.id,updateSize).then(data=>{
                res.status(200).json({"status":true,"message":"Update Successfully"})
            })
            .catch((error)=>{
                res.status(400).json({"status":false,"message":error});
            })
        }
        else{
            res.status(422).json({"status":false,"message":"Validation Error"})
        }
    }
    catch(err){
        res.status(400).json({"status":false,"message":err})
    }
}

exports.deleteSize = async (req,res)=>{
    try{
        if(req.body.hasOwnProperty("productId") && req.body.hasOwnProperty("sizeId")){
            await Category.findByIdAndDelete(req.body.sizeId).then(data=>{
                res.status(200).json({"status":true,"message":"Deleted Successfully"})
            })
            .catch((error)=>{
                res.status(400).json({"status":false,"message":error});
            })
        }
        else{
            res.status(422).json({"status":false,"message":"Validation Error"})
        }
    }
    catch(err){
        res.status(400).json({"status":false,"message":err})
    }
}
const express = require("express");
const router = express.Router();
const mongoose = require('mongoose')

var Users = require('../model/users');
router.get('/', (req, res) => {
    res.send('Hello World!');
});

router.get('/users', async (req, res) => { 
    const out = [];
    await Users.find({}).then((data) => {
        out.push(data);
        console.log(out)
    });

    res.status(200).json({
        message: "Users retrieved",
        success: true,
        users: out[0]
    })
});

router.post("/add", async (req, res) => {
    const data = req.body;
    if (data?.email && data?.firstName){
        let user = new Users(data);
        await Users.collection.insertOne(user);

        res.status(200).json({
            message : "User added",
            success : true
        })
    }
    else{
        res.status(500).json({
            message : "User not added. Please provide both email and firstName",
            success : false
        })
    }
});

router.get("/user/:id", async(req, res) => {
    const id = req.params.id;
    let user;
    if (mongoose.Types.ObjectId.isValid(id)){
        await Users.findById(id).then((data)=>{
            user = data
        });
        if (user != null){
            res.status(200).json({
                success: true,
                user: user
            })
        }
        else{
            res.status(500).json({
                success: false,
                message: "ID not found"
            })
        }
    }
    else{
        res.status(500).json({
            success: false,
            message: "ID not found"
        })
    }
});

router.put("/update/:id", async (req, res) => {
    const user = req.body;
    const id = req.params.id;
    const id_status = mongoose.Types.ObjectId.isValid(id);
    const params_status = user?.email && user?.firstName
    if (id_status && params_status){
        await Users.findByIdAndUpdate(id, {$set: {firstName: user.firstName, email: user.email}}).
        then((data) => {
            if (data != null){
                res.status(200).json({
                    message: "User udpated",
                    success: true
                })
            }
            else{
                res.status(500).json({
                    message: "ID not found",
                    success: false
                })
            }
            
            console.log(data)
        }).catch((err) => {
            res.status(500).json({
                message: err,
                success: false
            })
        })
        
    }
    else{
        res.status(500).json({
            message: "Couldn't find the ID or wrong params",
            success: false
        })
    }
});

router.delete('/delete/:id', async (req, res) => {
    const id = req.params.id;
    if (mongoose.Types.ObjectId.isValid(id)){
        await Users.findByIdAndRemove(id).then((data) => {
            if (data != null){
                res.status(200).json({
                    success: true,
                    message : "User deleted"
                })
            }
            else{
                res.status(500).json({
                    success: false,
                    message: "ID not found"
                })
            }
        }).catch((err) => {
            res.status(500).json({
                success: false,
                message: "Remove failed"
            })
        })
    }
    else{
        res.status(500).json({
            success: false,
            message: "Invalid ID"
        })
    }
})

module.exports = router
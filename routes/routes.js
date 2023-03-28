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
});

router.put("/update/:id", async (req, res) => {
    const user = req.body;
    const id = req.params.id;
    const id_status = mongoose.Types.ObjectId.isValid(id);
    const params_status = user?.email && user?.firstName
    if (id_status && params_status){
        Users.findByIdAndUpdate({_id: id}, {$set: {firstName: user.firstName, email: user.email}}).
        then((data) => {
            res.status(200).json({
                message: "User udpated",
                success: true
            })
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
            message: "Couldn't find the ID",
            success: false
        })
    }
});

module.exports = router
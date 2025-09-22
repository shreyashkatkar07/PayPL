const express = require('express');
const bodyParser = require('body-parser');
const {user} = require('../db');
const mongoose = require('mongoose');
const {JWTMiddleware} = require('../middleware/jwt');


const router = express.Router();
router.use(bodyParser.json());


router.post('/',JWTMiddleware, async(req, res) => {
    const key = req.body.key;
    const type = req.body.type;
    let currentUserId = req.id;
    try {
        currentUserId = new mongoose.Types.ObjectId(currentUserId);
    } catch (e) {
        return res.status(400).json({error: "Invalid user id"});
    }

    if(type === "name"){
        // Partial name match, exclude self
        const resp = await user.find({ 
            name: { $regex: new RegExp(key, 'i') },
            _id: { $ne: currentUserId }
        },{name:1,_id:1,number:1}).sort({name:1});
        if(!resp || resp.length === 0){
            res.status(400).json({error:"User with name not found"});
            return;
        }
        res.status(200).json({resp:resp});
    }
    else if(type === "number"){
        // Partial number match, exclude self, using aggregation to cast number to string
        if(!key || !/^[0-9]+$/.test(key)){
            res.status(400).json({error:"Invalid number"});
            return;
        }
        const resp = await user.aggregate([
            {
                $addFields: {
                    numberStr: { $toString: "$number" }
                }
            },
            {
                $match: {
                    numberStr: { $regex: key },
                    _id: { $ne: currentUserId }
                }
            },
            {
                $project: { name: 1, _id: 1, number: 1 }
            },
            { $sort: { name: 1 } }
        ]);
        if(!resp || resp.length === 0){
            res.status(400).json({error:"User with number not found"});
            return;
        }
        res.status(200).json({resp:resp});
    }
    else{
        res.status(400).json({error:"Invalid type"});
    }
});


module.exports = router;
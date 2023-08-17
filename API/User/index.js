import express from "express";

import { UserModel } from "../../database/allModels";

//Validation
import { ValidateUserId, ValidateUserUpdate } from "../../Validation/user";

const Router = express.Router();

/*
Route         "/"
Description    Get an user data
Access         public
Parameter      _id
Method         GET
*/ 

Router.get("/:_id", async (req,res) => {
    try{
        await ValidateUserId(req.params);
        const {_id} = req.params;
        const getUser = await UserModel.findById(_id);
        return res.json({user: getUser});
    }
    catch(error){
        return res.status(500).json({error: error.message});
    }
});

// <---------------------------------------------------------------------------->


/*
Route         "/update"
Description    Update the user data
Access         public
Body           User data
Parameter      _userId
Method         PUT
*/ 

Router.put("/update/:_userId", async (req,res) => {
    try{
        await ValidateUserId(req.params);
        await ValidateUserUpdate(req.body);
        const {_userId} = req.params;
        const {userData} = req.body;
        const updateUserData = await UserModel.findByIdAndUpdate(
            _userId,
            {
                $set: userData
            },
            {
                new: true
            }
        );
        return res.json({user: updateUserData});
    }
    catch(error){
        return res.status(500).json({error: error.message});
    }
});

// <---------------------------------------------------------------------------->
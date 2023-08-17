import express from "express";
import { ReviewModel } from "../../database/allModels";

//Validation
import { ValidateReview, ValidateReviewId } from "../../Validation/review";

const Router = express.Router();

/*
Route         "/new"
Description    Add new review
Access         public
Parameter      None
Body           Review object
Method         POST
*/ 

Router.post("/new", async (req,res) => {
    try{
        await ValidateReview(req.body);
        const {reviewData} = req.body;
        await ReviewModel.create(reviewData);
        return res.json({review: "Successfully Created Review"});
    }
    catch(error){
        return res.status(500).json({error: error.message});
    }
});

// <---------------------------------------------------------------------------->

/*
Route         "/delete"
Description    Delete a review
Access         public
Parameter      _id
Method         DELETE
*/ 

Router.delete("/delete/:_id", async (req,res) => {
    try{
        await ValidateReviewId(req.params);
        const {_id} = req.params;
        await ReviewModel.findOneAndDelete(_id);
        return res.json({review: "Successfully Deleted Review"});
    }
    catch(error){
        return res.status(500).json({error: error.message});
    }
});

// <---------------------------------------------------------------------------->

/*
Route         "/"
Description    Get all reviews
Access         public
Parameter      resid
Method         GET
*/ 

Router.get("/:resid", async (req,res) => {
    try{
        const reviews = await ReviewModel.find({restaurant: req.params.resid});
        return res.json({reviews});
    }
    catch(error){
        return res.status(500).json({error: error.message});
    }
});

export default Router;
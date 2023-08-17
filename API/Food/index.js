import express from "express";

import { FoodModel } from "../../database/allModels";

//Validation
import { ValidateRestaurantId, ValidateCategory } from "../../Validation/food";


const Router = express.Router();

/*
Route         "/"
Description    Get all the food based on particular restaurant
Access         Public
Parameter      _id
Method         GET
*/ 

Router.get("/:_id", async (req,res) => {
    try{
        await ValidateRestaurantId(req.params);
        const {_id} = req.params;
        const food = await FoodModel.find({ restaurant: _id});
        return res.json({food});
    }
    catch(error){
        return res.status(500).json({error: error.message});
    }
});

// <---------------------------------------------------------------------------->

/*
Route         "/r"
Description    Get all the food based on particular category
Access         Public
Parameter      category
Method         GET
*/ 

Router.get("/r/:category", async (req,res) => {
    try{
        await ValidateCategory(req.params);
        const {category} = req.params;
        const foods = await FoodModel.find({ 
            category: {$regex: category, $options: "i"}
        });
        return res.json({foods});
    }
    catch(error){
        return res.status(500).json({error: error.message});
    }
});

// <---------------------------------------------------------------------------->

export default Router;
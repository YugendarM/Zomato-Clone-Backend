import express from "express";
import { MenuModel, ImageModel } from "../../database/allModels";

const Router = express.Router();

//Validation
import { ValidateMenuId, ValidateImageId } from "../../Validation/menu";


/*
Route         "/list"
Description    Get the list of menu of a particular restaurant
Access         Public
Parameter      _id
Method         GET
*/ 

Router.get("/list/:_id", async (req,res) => {
    try{
        await ValidateMenuId(req.params);
        const {_id} = req.params;
        const menus = await MenuModel.findOne({_id});
        return res.json({menus});
    }
    catch(error){
        return res.status(500).json({error: error.message});
    }
});

// <---------------------------------------------------------------------------->

/*
Route         "/image"
Description    Get the image based on id
Access         Public
Parameter      _id
Method         GET
*/ 

Router.get("/image/:_id", async (req,res) => {
    try {
        await ValidateImageId(req.params);
        const {_id} = req.params;
        const menus = await ImageModel.findOne({_id});

        return res.json({menus});
    }
    catch (error){
        return res.status(500).json({error: error.message});
    }
});

// <---------------------------------------------------------------------------->

export default Router;
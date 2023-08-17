import  express  from "express";
import { RestaurantModel } from "../../database/allModels";

//Validation
import { ValidateRestaurantCity, ValidateRestaurantSearchString } from "../../Validation/restaurant";
import { ValidateRestaurantId } from "../../Validation/food";

const Router = express.Router();

/*
Route          "/"
Description    Get all the Restaurant details
Access         Public
Parameter      None 
Method         GET
*/


Router.get("/", async (req,res) => {
    try {
        await ValidateRestaurantCity(req.query);
        const {city} = req.query;
        const restaurants = await RestaurantModel.find({city});
        return res.json({restaurants});
    }
    catch (error) {
        return res.status(500).json({error: error.message});
    }

});

//<---------------------------------------------------------------------------------------->


/*
Route         "/"
Description    Get the particular Restaurant by id
Access         Public
Parameter      _id
Method         GET
*/ 


Router.get("/:_id", async (req,res) => {
    try {
        await ValidateRestaurantId (req.params);
        const {_id} = req.params;
        const restaurant = await RestaurantModel.findById({_id});

        if(!restaurant){
            return res.status(404).json({error: "Restaurant not found"});
        }
        else {
            return res.json({restaurant});
        }
    }
    catch (error){
        return res.status(500).json({error:error.message});
    }
});

//<---------------------------------------------------------------------------------------->

/*
Route         "/search"
Description    Get the Restaurants by name
Access         Public
Parameter      None
Body           searchString
Method         GET
*/ 

Router.get("/search", async (req,res) => {
    try{
        await ValidateRestaurantSearchString(req.body);
        const {searchString} = req.body;
        const restaurants = await RestaurantModel.find({
            name: {$regex: searchString , $options: "i"}
        });

        if(!restaurants){
            return res.status(404).json({error: "Restaurants not found"});
        }
        else {
            return res.json({restaurants});
        }
    } 
    catch (error) {
        return res.status(500).json({error: error.message});
    }
});



export default Router;
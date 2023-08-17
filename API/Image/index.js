import express, { json } from "express";
import { ImageModel } from "../../database/allModels";

//AWS
import AWS from "aws-sdk";
import multer from "multer";

//Utility
import { s3Upload } from "../../Utilities/AWS/s3";

const Router = express.Router();



 //Multer Upload
 const storage = multer.memoryStorage();
 const upload = multer({storage});
 

/*
Route         "/"
Description    Uploading given image s3 bucket and then saving the file to mongodb
Access         Public
Parameter      None
Method         POST
*/ 

Router.post("/", upload.single("file"), async (req,res) => {
    try{
        const file = req.file;

        const bucketOptions = {
            Bucket : "zomato-project",
            Key: file.originalname,
            Body: file.buffer,
            ContentType: file.mimetype,
            ACL: "public-read"
        };

        const uploadImages = await s3Upload(bucketOptions);

        return res.json({uploadImages})
    }
    catch(error){
        return res.status(500).json({error: error.message});
    }
});

// <---------------------------------------------------------------------------->

/*
Route         "/"
Description    To get image details
Access         Public
Parameter      _id
Method         GET
*/ 

Router.get("/:_id", async(req,res)=> {
    try{
        const image = await ImageModel.findById(req.params);
        return res.json({image});
    }
    catch(error){
        return res.status(500).json({error:error.message});
    }
})

export default Router;
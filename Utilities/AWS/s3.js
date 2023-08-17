import AWS from "aws-sdk";

//AWS S3 bucket config
const s3bucket = new AWS.S3({
    accessKeyId : "AKIAZHVVNTBIFKYOR6LX",
    secretAccessKey :  "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",
    region : "ap-south-1"
 });

export const s3Upload = (options) => {
    return new Promise ((resolve, reject) => {
        s3bucket.upload(options, (error,data) => {
            if(error){
                return reject(error);
            }
            else {
                resolve(data);
            }
        })
    })
};


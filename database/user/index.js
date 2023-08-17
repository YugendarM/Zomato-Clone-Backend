import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt  from "jsonwebtoken";


const UserSchema = new mongoose.Schema({
    fullName: {type:String , required:true},
    email: {type:String , required:true},
    password: {type:String },
    address: [{details: {type:String}, for: {type:String}}],
    phoneNumber: [{type:String}]
},
{
    timestamps: true
}
);


UserSchema.methods.generateJwtToken =  function () {
    return jwt.sign({user: this._id.toString()}, "ZomatoApp");
}


UserSchema.statics.findEmailandPhone = async({email,phoneNumber}) => {
    const checkUserEmail =await UserModel.findOne({email});

    const checkUserPhone =await UserModel.findOne({phoneNumber});

    if(checkUserPhone || checkUserEmail) {
        throw new Error("User already exist");
    }
    
    return false;
    
};


UserSchema.statics.findByEmailAndPassword = async({email,password}) => {
    const user =await UserModel.findOne({email});

    if(!user) throw new Error("User does not exist");

    const doesPasswrodMatch = bcrypt.compare(password, user.password);

    if(!doesPasswrodMatch) {
        throw new Error("Invalid password");
    }
    
    return user;
    
};



UserSchema.pre( "save" , function(next){
    const user = this;

    if(!user.isModified("password")) return next();

    bcrypt.genSalt(8, (error,salt) => {
        if(error) return next();

        bcrypt.hash(user.password, salt, (error,hash) => {
            if(error) return next();

            user.password = hash;
            return next();
        });
    });
});

export const UserModel = mongoose.model("User",UserSchema);
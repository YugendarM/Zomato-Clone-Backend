// import googleOAuth from "passport-google-oauth20";

// import { UserModel } from "../database/allModels";

// const GoogleStrategy = googleOAuth.Strategy;

// export default (passport) => {
//     passport.use(
//         new GoogleStrategy( {
//             clientID:process.env.GOOGLE_CLIENT_ID,
//             clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//             callbackURL: "http://localhost:4000/auth/google/callback"
//         },
//         async (accesToken, refreshToken, profile, done) => {
//             //creating a new User
//             const newUser = {
//                 fullName: profile.displayName,
//                 email: profile.emails[0].value,
//                 profilePic: profile.photos[0].value
//             };
//             try {
//                 //check whether user exist or not
//                 const user = await UserModel.findOne({email: newUser.email})
                
//                 if(user){
//                     //generate jwt token
//                     const token = user.generateJwtToken();
//                     //return user
//                     done(null, {user, token});
//                 }
//                 else {
//                     //creating a new User
//                     const user = await UserModel.create(newUser); 

//                     //generate jwt token
//                     const token = user.generateJwtToken();

//                     //return user
//                     done(null, {user, token});
//                 }
//             }
//             catch(error){
//                 done(error,null);
//             }
//         }
//         )
//     );

//     passport.serializeUser((userData,done) => done(null , {...userData}));
//     passport.deserializeUser((id , done) => done(null , id));
// };

import googleOAuth from "passport-google-oauth20";

import {UserModel} from "../database/allModels";

const GoogleStrategy = googleOAuth.Strategy;


export default (passport) => {
  passport.use(
    new GoogleStrategy({
      clientID: "513148522790-nek57376j0tikhtc0a6st607vthib7n3.apps.googleusercontent.com",
      clientSecret: "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",
      callbackURL: "http://localhost:4000/auth/google/callback"
    },
async(accessToken, refreshToken, profile, done) => {
  //creating a new user
  const newUser = {
    fullName: profile.displayName,
    email: profile.emails[0].value,
    profilePic: profile.photos[0].value
  };
  try{
    //check whether user exists or not
    const user = await UserModel.findOne({email: newUser.email});
    if(user) {

      //generating jwt token
      const token = user.generateJwtToken();
      //return user
      done(null, {user, token});
    } else {
      //create a new user
      const user = await UserModel.create(newUser);

      //generating jwt token
      const token = user.generateJwtToken();
      //return user
      done(null, {user, token});
    }
  } catch(error) {
    done(error, null);
  }
}
)
);

passport.serializeUser((userData,done) => done(null, {...userData}));
passport.deserializeUser((id, done) => done(null, id));

};
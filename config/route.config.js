import Jwtpassport from "passport-jwt";

import { UserModel } from "../database/allModels";

const JwtStrategy = Jwtpassport.Strategy;
const ExtractJwt = Jwtpassport.ExtractJwt;

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: "ZomatoApp",
};

export default (passport) => {
    passport.use( //--------------------------------------------
        new JwtStrategy(options, async(jwt__payload, done) => {
            try{
                const doesUserExist = UserModel.findById(jwt__payload.user);
                if(!doesUserExist){
                    return done(null, false);
                }
                else {
                    return done(null,doesUserExist);
                }
            }catch(error) {
                throw new Error(error);
            }
        })
    );
};
import passport from "passport";
import LocalStrategy from "passport-local";
import GitHubStrategy from "passport-github2";
import configvarenv from "./configvarenv.js";
import { UserService } from "../services/user.services.js";

import { createHash } from "../utils/bcryps.js";
import CustomError from "../services/errors/custom.error.js";
import { generateErrorUserInfo } from "../services/errors/info.js";
import EErrors from "../services/errors/enums.js";

const userService = new UserService()

const initializePassport = () => {

    passport.use('register', new LocalStrategy.Strategy(
        {usernameField:'email', passReqToCallback:true },
        async (req, username, password, done) => {

            try{
                const userData = req.body
                const user = await userService.findUserUsernameService(username);

                //CustomError
                if (!userData.first_name || !userData.last_name || !userData.email || !userData.password) {
                    
                    const error = CustomError.createError({
                        name: 'User creation Error',
                        cause: generateErrorUserInfo( userData ),
                        message: 'Error al crear un usuario',
                        code: EErrors.INVALID_TYPES_ERROR
                    })

                    return done(null, false, { message: error.message, details: error.cause });
                }

                if(user){
                    done('ERROR - Usuario ya existente', false)
                }

                const result = await userService.createUserService({
                    first_name: userData.first_name ,
                    last_name: userData.last_name ,
                    age: parseInt(userData.age),
                    email: username,
                    role: userData.role,
                    password: createHash(password),
                })
                
                return done(null, result);
        } catch (err) {
            req.logger.error(err);
            return done(err, false);
        }
    }
));

    passport.use("github", new GitHubStrategy(
        {
            clientID: configvarenv.clientid,
            clientSecret: configvarenv.clientsecret,
            callbackURL: configvarenv.callbackurl,
        },
        async ( accessToken, refreshToken, profile , done) => {
            try {
                const { name, email, login } = profile._json
            
                if(!email) {
                    return done(null, false, { message: "No se pudo obtener el email de GitHub. Por favor, intenta más tarde." });
                }

                const existingUser = await userService.findUserEmailService(email);

                if(!existingUser) {
                    const newUser = await userService.createUserService({
                        first_name: name ? name : login,
                        email : email,
                    });
                    return done(null, newUser);
                } 

                return done(null, existingUser);

            } catch (error) {
                return done(error)
            }
        }
    ))

    passport.serializeUser((user, done) => {
        done(null, user)
    })
    passport.deserializeUser((user, done) => {
        done(null, user)
    })
}

export { initializePassport }

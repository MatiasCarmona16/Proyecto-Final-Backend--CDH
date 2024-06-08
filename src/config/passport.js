import passport from "passport";
import LocalStrategy from "passport-local";
import GitHubStrategy from "passport-github2";

import { createUser, findUserEmail, findUserUsername } from "../services/user.services.js";
import { createHash } from "../utils/bcryps.js";
import CustomError from "../services/errors/custom.error.js";
import { generateErrorUserInfo } from "../services/errors/info.js";
import EErrors from "../services/errors/enums.js";

const initializePassport = () => {

    passport.use('register', new LocalStrategy.Strategy(
        {usernameField:'email', passReqToCallback:true },
        async (req, username, password, done) => {

            try{
                const userData = req.body
                const user = await findUserUsername(username);

                //CustomError
                if (!userData.first_name || !userData.last_name || !userData.email || !userData.password) {
                    
                    const error = CustomError.createError({
                        name: 'User creation Error',
                        cause: generateErrorUserInfo( userData ),
                        message: 'Error al crear un usuario',
                        code: EErrors.INVALID_TYPES_ERROR
                    })

                    console.log(error);
                    return done(null, false, { message: error.message, details: error.cause });
                }

                if(user){
                    done('ERROR - Usuario ya existente', false)
                }

                const result = await createUser({
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
            clientID: "Iv1.bd005d86174cd177",
            clientSecret: "7be438900a55d616148dd8c1de35636be10dce99",
            callbackURL: "http://localhost:8080/api/auth/callbackGithub",
        },
        async ( accessToken, refreshToken, profile , done) => {
            try {
                const { name, email, login } = profile._json
            
                if(!email) {
                    return done(null, false, { message: "No se pudo obtener el email de GitHub. Por favor, intenta más tarde." });
                }

                const existingUser = await findUserEmail(email);

                if(!existingUser) {
                    const newUser = await createUser({
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

import passport from "passport";
import LocalStrategy from "passport-local";
import github from "passport-github2";

import { createUser, findUserEmail, findUserUsername, findUserId } from "../services/user.services.js";
import { createHash } from "../utils/bcryps.js";

const initializePassport = () => {

    passport.use('register', new LocalStrategy.Strategy(
        {usernameField:'email', passReqToCallback:true },
        async (req, username, password, done) => {

            try{
                const userData = req.body
                const user = await findUserUsername(username);
                
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
                
                done(null, result)
            }catch(error){
                done(`ERROR en la creacion de usuario ${error}`, false)
            }
        }) 
    )

    passport.use("github", new github.Strategy(
        {
            clientID: "Iv1.bd005d86174cd177",
            clientSecret: "7be438900a55d616148dd8c1de35636be10dce99",
            callbackURL: "http://localhost:8080/api/auth/callbackGithub",
        },
        async ( accessToken, refreshToken, profile , done) => {
            console.log(profile)
            try {
                const { name, email, login } = profile._json
            
                if(!email) {
                    return done("Hay problemas con GitHub, intentalo mas tarde")
                }

                let user = await findUserEmail(email);

                if(!user) {
                    const newUser = await createUser({
                        first_name: name ? name : login,
                        email : email,
                    });
                    return done(null, newUser);
                } 
                
                return done(null, user);

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

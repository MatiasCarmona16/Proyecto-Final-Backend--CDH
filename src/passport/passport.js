import passport from "passport";
import LocalStrategy from "passport-local";
import github from "passport-github2";

import { UserManagerMongo } from "../../dao/mongoDB/controllers/userManager.js";
import { createHash } from "../utils/bcryps.js";

const userManagerMongo = new UserManagerMongo()

const initializePassport = () => {

    passport.use('register', new LocalStrategy.Strategy(
        {usernameField:'email', passReqToCallback:true },
        async (req, username, password, done) => {

            try{
                const userData = req.body
                const user = await userManagerMongo.getUser(username)
                
                if(user){
                    done('ERROR - Usuario ya existente', false)
                }

                const result = await userManagerMongo.newUser({
                    first_name: userData.first_name ,
                    last_name: userData.last_name ,
                    age: parseInt(userData.age),
                    email: username,
                    password:createHash(password),
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
            clientSecret: "e2611401d59123e680127f038a2681367295b8b6",
            callbackURL: "http://localhost:8080/auth/callbackGithub",
        },
        async ( accessToken, refreshToken, profile , done) => {
            try {
                const { name: first_name, username, login } = profile._json
            
                let user = await userManagerMongo.getUser(username)

                if(!user) {
                    const newUser = await userManagerMongo.newUser({
                        first_name,
                        email : username,
                        password: createHash(`${email + login}123`)
                    })
                    return done(null, newUser)
                } 
                
                return done(null, user)

            } catch (error) {
                return done(error)
            }
        }
    ))

    passport.serializeUser((user, done) => {
        done(null, user._id)
    })
    passport.deserializeUser(async (id, done) => {
        const user = await userManagerMongo.getUserId(id)
        done(null, user)
    })
}

export { initializePassport }

import passport from "passport";
import GitHubStretegy from "passport-github2"
import LocalStrategy from "passport-local"
import { UserManagerMongo } from "../../dao/mongoDB/controllers/userManager.js";
import { createHash, isValidatePassword } from "../utils/bcryps.js";
import UserSchema from '../../dao/mongoDB/schemas/user.schema.js'

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

    passport.use("github", new GitHubStretegy(
        {
            clientID: "Iv1.bd005d86174cd177",
            clientSecret: "e2611401d59123e680127f038a2681367295b8b6",
            callbackURL: "http://localhost:8080/auth/callbackGithub",
        },
        async ( accessToken, refreshToken, profile , done) => {
            try {
                console.log(profile)
                let user = await UserSchema.findOne({email:profile.email})

                if(!user) {
                    let newUser = {
                            first_name: profile.name,
                            last_name: '' ,
                            email: profile.email,
                            password: ''
                        }
                        let result = await UserSchema.create(newUser)
                        done(null, result)
                }
                else{
                    done(null, user)
                }
            } catch (error) {
                return done(error)
            }
        }
    ))

    passport.serializeUser((user, done) => {
        done(null, user._id)
    })
    passport.deserializeUser(async (id, done) => {
        let user = await userManagerMongo.getUserId(id)
        done(null, user)
    })
}

export { initializePassport }

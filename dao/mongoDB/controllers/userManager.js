import UserSchema from '../schemas/user.schema.js'

export class UserManagerMongo {
    async newUser({ first_name, last_name, age, email, password }) {
        try {
            const newUser = await UserSchema.create({
                first_name,
                last_name,
                age,
                email,
                password,
            })
            return newUser
        }catch (err) {
            return err
        }
    }

    async get (email, password) {
        try {
            const user = await UserSchema.findOne({ email, password })
            return user
        }catch (error){
            throw error
        }
    }
}


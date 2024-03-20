import { UserSchema }from '../schemas/user.schema.js'

class UserManagerMongo {
    async newUser({ first_name, last_name, age, email, password }) {
        try {
            const newuserd = await UserSchema.create({
            first_name,
            last_name,
            age,
            email,
            password,
        })
        return { newuserd }
    }catch (error) {
        throw error
    }
}

    async getAllUsers () {
        try {
            const users = await UserSchema.find().lean()
        return users
        }catch (error) {
            return (error)
        }
    }
    

    async getUser (email) {
        try {
            const user = await UserSchema.findOne({ email })
            return user
        }catch (error){
            throw error
        }
    }

    async getUserId (id) {
        try {
            const user = await UserSchema.findById(id)
            return user
        } catch (error) {
            throw error
        }
    }
}

export { UserManagerMongo }
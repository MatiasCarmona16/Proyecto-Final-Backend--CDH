import UserSchema from '../schemas/user.schema.js'

export class UserManagerMongo {
    
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
        return res.status(500).json({ error: error.message })
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
}


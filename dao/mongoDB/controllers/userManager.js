import UserSchema from '../schemas/user.schema.js'

export class UserManagerMongo {
    
    async newUser({ first_name, last_name, age, email, password }) {
        
        try {
            const newUser =  new UserSchema.create({
            first_name,
            last_name,
            age,
            email,
            password,
        })
        return { newUser }
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
    

    async getUser (email, password) {
        try {
            const user = await UserSchema.findOne({ email, password })
            return user
        }catch (error){
            throw error
        }
    }
}


import { UserSchema } from "../models/MongoDB/user.schema.js";

//Crear Usuario
export async function createUser ({ first_name, last_name, age, email,role, password }) {
    try {
        const newUser = await UserSchema.create({
            first_name,
            last_name,
            age,
            email,
            role,
            password,
        })
        return { newUser };
    } catch (error) {
        throw new Error (error);
    }
}

//Obtener email de usuario
export async function findUserEmail (email) {
    try {
        const userEmail = await UserSchema.findOne({email});
        return userEmail;
    } catch (error) {
        throw new Error (error);
    }
}

//Obtener usuario (username)
export async function findUserUsername (username) {
    try {
        const userUsername = await UserSchema.findOne( {username} );
        return userUsername;
    } catch (error) {
        throw new Error (error);
    }
}

//Obtener ID de usuario
export async function findUserId (id) {
    try {
        const userId = await UserSchema.findById(id);
        return userId;
    } catch (error) {
        throw new Error (error);
    }
}

export async function findCartIdbyUser(cartId) {
    try {
        const user = await UserSchema.findOne({ cart: cartId }).populate('cart')
        return user ? user.cart : null;
    } catch (error) {
        throw new Error(error);
    }
}
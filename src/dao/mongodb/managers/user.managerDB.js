import { UserSchema } from "../models/user.schema.js";

export class UserManager {
    //Metodo para crear un usuario
    async createUser ({ first_name, last_name, age, email,role, password }) {
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
            return { success: false, message: `Error al crear un usuario.`, error: error }
        }
    }
    
    //Metodo para buscar usuario por email
    async findUserEmail(email) {
        try {
            const userEmail = await UserSchema.findOne({email});
            return userEmail;
        } catch (error) {
            return { success: false, message: `Error, no se encontro usuario.`, error: error }
        }
    }

    //Metodo para obtener usuario por username
    async findUserUsername (username) {
        try {
            const userUsername = await UserSchema.findOne( {username} );
            return userUsername;
        } catch (error) {
            return { success: false, message: `Error, no se encontro usuario.`, error: error }
        }
    }

    //Metodo para obtener ID de usuario
    async findUserId (id) {
        try {
            const userId = await UserSchema.findById(id);
            return userId;
        } catch (error) {
            return { success: false, message: `Error, no se encontro usuario.`, error: error }
        }
    }

//Metodo para obtener el carrito de usuario
    async findCartIdbyUser(cartId) {
        try {
            const user = await UserSchema.findOne({ cart: cartId }).populate('cart')
            return user ? user.cart : null;
        } catch (error) {
            return { success: false, message: `Error, no se encontro carrito de usuario.`, error: error };
        }
    }

//Metodo para obtener el token del usuario
    async getUserByResetToken(token) {
        try {
            const userData = await UserSchema.findOne({ resetToken: token, resetTokenExpiration: { $gt: Date.now() } });
            return userData;
        } catch (error) {
            return { success: false, message: `Error, no se encontro token de usuario.`, error: error }
        }
    }
}

export default { UserManager }
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
            return newUser ;
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

    //Metodo para obtener todos los usuarios
    async getUsersFilter(){
        try {
            const usersData = await UserSchema.find({}, 'first_name last_name email role');
            return usersData;
        } catch (error) {
            return { success: false, message: `Error, no se encontraron los usuarios.`, error: error }
        }
    }

    //Metodo para eliminar usuario especifico
    async deleteUserSpecific(id){
        try{
            const result = await UserSchema.findByIdAndDelete(id);
            if (!result) {
                throw new Error('User not found');
            }
            return { success: true, message: "User deleted successfully." };
        }catch(error){
            return { success: false, message: `Error, no se elimino el usuario.`, error: error }
        }
    }

    //Metodo para eliminar los usuarios inactivos
    async deleteUsersInactive(){
        const cutOffDate = new Date();
        cutOffDate.setDate(cutOffDate.getDate() - 2); //2 dias

        try {
            const deletedUsers = await UserSchema.deleteMany({ last_connection: { $lte: cutOffDate } })
            return deletedUsers;
        } catch (error) {
            return { success: false, message: `Error, no se eliminaron los usuarios.`, error: error }
        }
    }
}

export default { UserManager }
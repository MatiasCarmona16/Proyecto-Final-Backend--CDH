import { UserSchema } from "../models/user.schema.js";
import { transporter } from "../../../config/mail.js";

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
            const inactiveUsers = await UserSchema.find({ last_connection: { $lte: cutOffDate } });

            const deletedUsers = await UserSchema.deleteMany({ last_connection: { $lte: cutOffDate } })

            for (const user of inactiveUsers) {
                const mailOptions = {
                    from: 'iPhone Store <matias2002carmona@gmail.com>',
                    to: user.email,
                    subject: 'Account Deletion Notification',
                    text: `Hello ${user.first_name}`,
                    html: `
                    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                        <div style="text-align: center; padding: 20px; background-color: #f4f4f4;">
                            <h1 style="color: #333;">iPhone Store</h1>
                        </div>
                        <div style="padding: 20px;">
                            <h2>Hello ${user.first_name},</h2>
                            <p style="font-size: 16px;">We noticed that you have been inactive on the iPhone Store for more than 2 days. As a result, your account has been removed due to inactivity.</p>
                            <p style="font-size: 16px;">If you have any questions or believe this is a mistake, please contact our support team.</p>
                            <p style="font-size: 16px;">Thank you for your understanding.</p>
                        </div>
                        <div style="text-align: center; padding: 20px; background-color: #f4f4f4;">
                            <p style="font-size: 14px; color: #777;">© 2024 iPhone Store. All rights reserved.</p>
                        </div>
                    </div>
                `,
                };

                try {
                    await transporter.sendMail(mailOptions);
                } catch (error) {
                    console.error(`Failed to send email to ${user.email}: ${error.message}`);
                }
            }

            return { 
                deletedCount: deletedUsers.deletedCount,
                inactiveUsers: inactiveUsers
            };
        } catch (error) {
            return { success: false, message: `Error, no se eliminaron los usuarios inactivos.`, error: error }
        }
    }

}

export default { UserManager }
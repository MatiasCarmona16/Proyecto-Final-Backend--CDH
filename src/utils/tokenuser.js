import crypto from "crypto";
import { UserSchema } from "../dao/mongodb/models/user.schema.js";

export const generateResetToken = () => {
    return crypto.randomBytes(32).toString('hex');
};

export const saveResetToken = async (email, token) => {
    const expirationTime = Date.now() + 3600000;
    
    try {
        await UserSchema.updateOne({ email }, {
            resetToken: token,
            resetTokenExpiration: expirationTime
        });
    } catch (error) {
        throw new Error(`Error al guardar el token de restablecimiento: ${error.message}`);
    }
};
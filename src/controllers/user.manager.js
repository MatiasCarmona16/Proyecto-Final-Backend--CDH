import passport from "passport";
import { 
    createUser,
    findUserEmail,
} from "../services/user.services.js"
import { isValidatePassword } from "../utils/bcryps.js";

//Crear un usuario con "createUser"
export const addUser = async (req, res) => {
    const dataUser = req.body;
    try {
        const addedUser = await createUser(dataUser);
        res.status(200).json(addedUser);
    } catch (error) {
        req.logger.warning(`warning log - ${error}`)
        req.logger.error(`error log - ${error}`)
        res.status(500).json({ message: error.message })
    }
};

//Buscar un usuario con "findUserEmail" para que pueda loguearse y ser verificado
export const getUserEmail = async (req, res) => {
    const { email, password } = req.body;
    try {
        const emailUser = await findUserEmail(email);
        
        if (!emailUser) {
            req.flash('error_msg', 'The email is incorrect. Try again.');
            return res.redirect("/auth/login-view");
        }

        if (!isValidatePassword(emailUser, password)) {
            req.flash('error_msg', 'The password is incorrect. Try again.');
            return res.redirect("/auth/login-view");
        }

        // Si el usuario y la contraseña son válidos, iniciar sesión
        req.session.user = emailUser;
        return res.status(200).redirect('/');
    } catch (error) {
        req.logger.warning(`warning log - ${error}`)
        req.logger.error(`error log - ${error}`)
        res.status(500).json({ message: error.message });
    }
};

export const authPassport = async (req, res) => {
    try {
        passport.authenticate("register", { failureRedirect: "/auth/register-view",}) (req, res, () => {
            res.status(200).redirect('/auth/login-view');
        })
    }catch (error) {
        req.logger.warning(`warning log - ${error}`)
        req.logger.error(`error log - ${error}`)
        res.status(500).json(error);
    }
};

export const logoutUser = async (req, res) => {
    req.session.destroy((err) => {
        if(err) {
            console.error('No se pudo cerrar sesion:',err);
            return res.status(500).json({ error: "Falla en cerrar la sesion" });
        } else {
            return res.status(200).redirect("/auth/login-view")
        }
    });
};
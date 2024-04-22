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
        res.status(500).json({ message: error.message })
    }
};

//Buscar un usuario con "findUserEmail" para que pueda loguearse y ser verificado
export const getUserEmail = async (req, res) => {
    const { email, password } = req.body;
    try {
        const emailUser = await findUserEmail(email);
        if (!emailUser) {
            console.log(email, password);

            if(!isValidatePassword(emailUser, password)) {
                return res.satus(401).json({ error: "Your account has not been found" });
            }

            req.session.user = emailUser;
            return res.status(200).redirect("/productsview");
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const authPassport = async (req, res) => {
    try {
        passport.authenticate("register", { failureRedirect: "/auth/failedregister-view",}) (req, res, () => {
            res.status(200).json({ message: "Registered"});
        })
    }catch (error) {
        res.status(500).json(error);
    }
};

export const githubPassport = async (req, res) => {
    passport.authenticate("github", {scope:["user:email"]}), async (req, res) => {}
};

export const githubCallBackPassport = async (req, res) => {
    passport.authenticate("github", {}), async (req, res) => {
        req.session.user = req.user;
        return res.status(200).redirect('/productsview');
    };
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
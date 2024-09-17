import { UserService } from "../services/user.services.js";
import passport from "passport";
import path from "path";

import { isValidatePassword } from "../utils/bcryps.js";
import { transporter } from "../config/mail.js";
import { generateResetToken, saveResetToken } from "../utils/tokenuser.js";
import { createHash } from "../utils/bcryps.js";

const userService = new UserService();

//Crear un usuario con "createUser"
export const addUser = async (req, res) => {
  const dataUser = req.body;
  try {
    const addedUser = await userService.createUserService(dataUser);
    res.status(200).json(addedUser);
  } catch (error) {
    req.logger.warning(`warning log - ${error}`);
    req.logger.error(`error log - ${error}`);
    res.status(500).json({ message: error.message });
  }
};

//Buscar un usuario con "findUserEmail" para que pueda loguearse y ser verificado
export const getUserEmail = async (req, res) => {
  const { email, password } = req.body;
  try {
    const emailUser = await userService.findUserEmailService(email);

    if (!emailUser) {
      req.flash("error_msg", "The email is incorrect. Try again.");
      return res.redirect("/auth/login-view");
    }

    if (!isValidatePassword(emailUser, password)) {
      req.flash(
        "error_msg",
        'Incorrect password. Please try again or select "Forgot your password?" to change it.'
      );
      return res.redirect("/auth/login-view");
    }

    // Si el usuario y la contraseña son válidos, iniciar sesión

    emailUser.last_connection = new Date();
    await emailUser.save();

    req.session.user = emailUser;
    return res.status(200).redirect("/");
  } catch (error) {
    req.logger.warning(`warning log - ${error}`);
    req.logger.error(`error log - ${error}`);
    res.status(500).json({ message: error.message });
  }
};

export const authPassport = async (req, res) => {
  try {
    passport.authenticate("register", {
      failureRedirect: "/auth/register-view",
    })(req, res, () => {
      res.status(200).redirect("/auth/login-view");
    });
  } catch (error) {
    req.logger.warning(`warning log - ${error}`);
    req.logger.error(`error log - ${error}`);
    res.status(500).json(error);
  }
};

//Deslogue al usuario
export const logoutUser = async (req, res) => {
  try {
    const userEmail = req.session.user.email;
    const user = await userService.findUserEmailService(userEmail);

    if (user) {
      user.last_connection = new Date();
      await user.save();
    }

    req.session.destroy((err) => {
      if (err) {
        console.error("No se pudo cerrar sesion:", err);
        return res.status(500).json({ error: "Falla en cerrar la sesion" });
      } else {
        return res.status(200).redirect("/auth/login-view");
      }
    });
  } catch (error) {
    req.logger.warning(`warning log - ${error}`);
    req.logger.error(`error log - ${error}`);
    res.status(500).json(error);
  }
};

//Recuperar la mediante el mail de restauracion
export const recoverPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const userData = await userService.findUserEmailService(email);

    if (!userData) {
      req.flash("error_msg", "The email is incorrect. Try again.");
      return res.redirect("/auth/recover-password-view");
    }

    const token = generateResetToken();
    await saveResetToken(email, token);

    let mensaje = await transporter.sendMail({
      from: "iPhone Store <matias2002carmona@gmail.com>",
      to: `${userData.email}`,
      subject: "Recover password",
      text: "The link to reset your password will expire in 1 hour.",
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
            <div style="text-align: center; padding: 20px; background-color: #f4f4f4;">
                <h1 style="color: #333;">iPhone Store</h1>
            </div>
            <div style="padding: 20px;">
                <h2>Password Reset Link</h2>
                <p style="font-size: 16px;">Click the following link to reset your password. This link will expire in 1 hour.</p>
                <p style="font-size: 16px;">
                    Link: <a href="https://proyecto-final-backend-cdh-production.up.railway.app/auth/restore-password-view?token=${token}" style="color: #007bff; text-decoration: none;">Click here to reset your password</a>
                </p>
                <p style="font-size: 16px;">If you did not request a password change, please ignore this email.</p>
                <p style="font-size: 16px;">Thank you,</p>
                <p style="font-size: 16px;">The iPhone Store Team</p>
            </div>
            <div style="text-align: center; padding: 20px; background-color: #f4f4f4;">
                <p style="font-size: 14px; color: #777;">© 2024 iPhone Store. All rights reserved.</p>
            </div>
        </div>
    `,
    });

    if (!!mensaje.messageId) {
      return res
        .status(200)
        .json({ success: true, message: "Email sent successfully." });
    }
  } catch (error) {
    req.logger.warning(`warning log - ${error}`);
    req.logger.error(`error log - ${error}`);
    res.status(500).json({ message: error.message });
  }
};

//Logica para restaurar password

export const restorePassword = async (req, res) => {
  const { token, newPassword, confirmPassword } = req.body;

  if (newPassword !== confirmPassword) {
    req.flash("error_msg", "Las contraseñas no coinciden.");
    return res.redirect(`/auth/restore-password-view?token=${token}`);
  }

  try {
    const userData = await userService.getUserByResetTokenService(token);

    if (!userData) {
      req.flash(
        "error_msg",
        "El enlace de restablecimiento es inválido o ha expirado."
      );
      return res.redirect("/auth/recover-password-view");
    }

    const isDifferent = !isValidatePassword(userData, newPassword);
    if (!isDifferent) {
      req.flash(
        "error_msg",
        "No puedes establecer la misma contraseña anterior."
      );
      return res.redirect(`/auth/restore-password-view?token=${token}`);
    }

    const hashedPassword = createHash(newPassword);
    userData.password = hashedPassword;
    userData.resetToken = undefined;
    userData.resetTokenExpiration = undefined;
    await userData.save();

    return res.redirect("/auth/login-view");
  } catch (error) {
    req.logger.warning(`warning log - ${error}`);
    req.logger.error(`error log - ${error}`);
    res.status(500).json({ status: "error", error: "Unhandled error" });
  }
};

//Logica para que cambie de rol el usuario desde la vista usuario

export const changeUserRole = async (req, res) => {
  const { uid } = req.params;

  try {
    const user = await userService.findUserIdService(uid);

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    if (user.role === "usuario") {
      const requiredDocuments = [
        "Identificacion",
        "Comprobante de domicilio",
        "Comprobante de estado de cuenta",
      ];
      const uploadedDocuments = user.documents.map((doc) => doc.name);
      const hasAllDocuments = requiredDocuments.every((doc) =>
        uploadedDocuments.includes(doc)
      );

      if (!hasAllDocuments) {
        return res.status(400).json({
          message: "El usuario no ha completado la documentación requerida",
        });
      }

      user.role = "premium";
    } else if (user.role === "premium") {
      user.role = "usuario";
    } else {
      return res.status(400).json({ message: "Rol no válido" });
    }

    await user.save();

    req.session.user = user;

    res.status(200).json({
      message: `Rol cambiado a ${user.role}`,
      userInfo: user,
    });
  } catch (error) {
    req.logger.warning(`warning log - ${error}`);
    req.logger.error(`error log - ${error}`);
    res.status(500).json({ message: error.message });
  }
};

//Logica para cambiar el rol de usuario desde la vista de admin

export const changeUserRoleforAdmin = async (req, res) => {
  const { uid } = req.params;

  try {
    const user = await userService.findUserIdService(uid);
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    if (user.role === "usuario") {
      user.role = "premium";
    } else if (user.role === "premium") {
      user.role = "usuario";
    } else {
      return res.status(400).json({ message: "Rol no válido" });
    }

    await user.save();

    res.status(200).json({
      message: `Rol cambiado a ${user.role}`,
      userInfo: user,
    });
  } catch (error) {
    req.logger.warning(`warning log - ${error}`);
    req.logger.error(`error log - ${error}`);
    res.status(500).json({ message: error.message });
  }
};

//Logica para cargar los documentos
export const uploadDocuments = async (req, res) => {
  const { uid } = req.params;

  try {
    const user = await userService.findUserIdService(uid);

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    if (req.files) {
      const files = []
        .concat(req.files.profiles, req.files.products, req.files.documents)
        .filter(Boolean);

      files.forEach((file) => {
        const originalFileName = path.basename(
          file.originalname,
          path.extname(file.originalname)
        );

        user.documents.push({
          name: originalFileName,
          reference: path.join(
            "uploads",
            file.destination.split("uploads")[1],
            file.filename
          ),
        });
      });

      await user.save();
      return res.status(200).json({ message: "Documentos subidos con éxito" });
    } else {
      return res.status(400).json({ message: "No se subieron archivos" });
    }
  } catch (error) {
    console.error("Error al subir documentos:", error);
    return res.status(500).json({ message: error.message });
  }
};

//Logica para mostrar todos los usuarios
export const getUsers = async (req, res) => {
  try {
    const usersInfo = await userService.getUsersService();
    res.status(200).json(usersInfo);
  } catch (error) {
    req.logger.warning(`warning log - ${error}`);
    req.logger.error(`error log - ${error}`);
    res.status(500).json({ message: error.message });
  }
};

//Logica para eliminar un usuario en especifico
export const deleteUser = async (req, res) => {
  const { uid } = req.params;

  try {
    await userService.deleteUserService(uid);
    res.status(200).send({ succes: true });
  } catch (error) {
    req.logger.warning(`warning log - ${error}`);
    req.logger.error(`error log - ${error}`);
    res.status(500).json({ message: error.message });
  }
};

//Logica para la eliminacion de usuarios
export const deleteUsersInactive = async (req, res) => {
  try {
    const deletUser = await userService.deleteUsersInactiveService();

    res.status(200).json(deletUser);
  } catch (error) {
    req.logger.warning(`warning log - ${error}`);
    req.logger.error(`error log - ${error}`);
    res.status(500).json({ message: error.message });
  }
};

export const getUserSpecificbyId = async (req, res) => {
  const { uid } = req.params;
  try {
    const userFound = await userService.findUserIdService(uid);
    return userFound;
  } catch (error) {
    req.logger.warning(`warning log - ${error}`);
    req.logger.error(`error log - ${error}`);
    res.status(500).json({ message: error.message });
  }
};

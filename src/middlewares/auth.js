//Funcion de autenticacion
export function requireLogin (req, res, next) {
    if (req.session.user) {
        next();
    } else {
        res.redirect("/auth/login-view");
    }
};


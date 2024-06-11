//Funcion de admin
export function passAdmin (req, res, next) {
    if (req.session.user && req.session.user.role === "admin" || req.session.user.role === "premium") {
        next();
    } else {
        res.redirect("/auth/failedregister-view");
    }
};
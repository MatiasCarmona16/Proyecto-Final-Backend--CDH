//Funcion de admin
export function passAdmin (req, res, next) {
    if (req.session.user && req.session.user.role === "admin") {
        next();
    } else {
        res.redirect("/auth//failedregister-view");
    }
};
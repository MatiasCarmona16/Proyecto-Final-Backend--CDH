//Funcion de middleware admin
export function passAdmin (req, res, next) {
    if (req.session.user && req.session.user.role === "admin") {
        next();
    } else {
        req.flash('error_msg', 'You do not have access to this section');
        res.redirect("/");
    }
};
//Funcion de admin
export function passPrem (req, res, next) {
    if (req.session.user && req.session.user.role === "admin" || req.session.user.role === "premium") {
        next();
    } else {
        req.flash('error_msg', 'You do not have access to this section');
        res.redirect("/");
    }
};
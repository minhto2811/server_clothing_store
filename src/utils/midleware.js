
exports.check_admin = (req, res, next) => {
    if (req.session.user != null && req.session.user.role) {
        next();
    } else {
        res.redirect('/user/sign-in');
    }
}



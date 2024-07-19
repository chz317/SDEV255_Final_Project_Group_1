const isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
};

const isTeacher = (req, res, next) => {
    if (req.user && req.user.role === 'teacher') {
        return next();
    }
    res.status(403).send('Forbidden');
};

module.exports = { isAuthenticated, isTeacher };

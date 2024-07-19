module.exports = {
    isAuthenticated: (req, res, next) => {
      if (req.isAuthenticated()) {
        return next();
      }
      res.redirect('/login');
    },
    isTeacher: (req, res, next) => {
      if (req.isAuthenticated() && req.user.role === 'teacher') {
        return next();
      }
      res.redirect('/login');
    }
  };
  
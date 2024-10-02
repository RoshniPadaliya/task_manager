exports.authorizeRoles = (...roles) => {
    return (req, res, next) => {
      if (!req.user.role || !roles.includes(req.user.role.name)) {
        return res.status(403).json({ message: 'Forbidden: Access is denied' });
      }
      next();
    };
  };
  
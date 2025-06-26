function authorizeRoles(...rolesAuthorization) {
  return (req, res, next) => {
    try {
      const user = req.user;

      if (!user) {
        return res.status(401).json({
          message: "Unauthorized: No user found in request",
        });
      }

      if (!rolesAuthorization.includes(user.user_type)) {
        return res.status(403).json({
          errorType: "Authorization Error",
          details: `Access denied for role '${user.user_type}'.`,
          allowedOnlyFor: rolesAuthorization,
        });
      }

      next();
    } catch (error) {
      return res.status(500).json({
        message: "Internal Server Error",
        error: error.message,
      });
    }
  };
}

export default authorizeRoles;

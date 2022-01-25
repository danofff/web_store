const checkIsUserAdmin = (req, res, next) => {
  if (req.user.isAdmin) {
    return next();
  } else {
    const error = new Error("You are not allowed to do this operation");
    return next(error);
  }
};

module.exports = checkIsUserAdmin;

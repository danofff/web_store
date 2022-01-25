const checkUser = (req, res, next) => {
  if (req.user) {
    return next();
  } else {
    const error = new Error("Unauthorized operation");
    return next(error);
  }
};

module.exports = checkUser;

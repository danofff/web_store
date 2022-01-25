const jwt = require("jsonwebtoken");
const { getUserById } = require("../db/");

const JWT_SECRET = process.env.JWT_SECRET || "shopper dirty secret";

const checkAuthUser = async (req, res, next) => {
  const auth = req.header("Authorization");
  if (!auth) {
    return next();
  }
  const token = auth.split(" ")[1];

  if (!token) {
    return next();
  }

  try {
    const { id } = jwt.verify(token, JWT_SECRET);

    const user = await getUserById(id);
    if (user) {
      req.user = user;
    }
    return next();
  } catch (error) {
    return next(error);
  }
};

module.exports = checkAuthUser;

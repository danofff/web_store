const { Router } = require("express");
const {
  verifyUser,
  getUserByEmail,
  createUser,
  getUserById,
} = require("../db");
const jwt = require("jsonwebtoken");

const checkUser = require("../middleware/checkUser");

const JWT_SECRET = process.env.JWT_SECRET || "shopper dirty secret";

const usersRouter = Router();

//get user info by id
usersRouter.get("/:userId", checkUser, async (req, res, next) => {
  const { userId } = req.params;
  try {
    if (req.user.id !== +userId && !req.user.isAdmin) {
      throw new Error("You are not authorized for this operation");
    }
    const user = await getUserById(userId);
    res.status(200).json({ user });
  } catch (error) {
    return next(error);
  }
});

//register a new user
usersRouter.post("/register", async (req, res, next) => {
  const { email, password, address, zip } = req.body;

  try {
    if (!email) {
      throw new Error("Email address must not to be empty");
    }

    const retrivedUser = await getUserByEmail(email);
    if (retrivedUser) {
      throw new Error(`User with email ${email} already exists`);
    }

    const createdUser = await createUser(email, password, address, zip);

    res.status(201).json({ user: createdUser });
  } catch (error) {
    return next(error);
  }
});

//login user, send back token and user info
usersRouter.post("/login", async (req, res, next) => {
  const { email, password } = req.body;
  if (!email) {
    return next(new Error("No email credential"));
  }
  if (!password) {
    return next(new Error("No password credential"));
  }

  try {
    const userByEmail = await getUserByEmail(email);
    if (!userByEmail) {
      throw new Error("No such user was register");
    }
    const user = await verifyUser(email, password);
    if (!user) {
      throw new Error(`Incorrect password for ${email}`);
    }
    const token = jwt.sign({ id: user.id }, JWT_SECRET);
    res.status(200).send({
      token,
      email: user.email,
      userId: user.id,
      isAdmin: user.isAdmin,
    });
  } catch (error) {
    return next(error);
  }
});

module.exports = usersRouter;

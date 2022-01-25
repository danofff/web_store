const { Router } = require("express");
const { verifyUser, getUserByEmail } = require("../db");

const userRouter = Router();

userRouter.post("/login", (req, res, next) => {
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
    const token = jwt.sign(
      { id: user.id, email: user.email, isAdmin: user.isAdmin },
      JWT_SECRET
    );
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

module.export = userRouter;

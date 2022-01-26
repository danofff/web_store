const client = require("./client");
const bcrypt = require("bcrypt");
var Isemail = require("isemail");
const SALT_COUNT = process.env.SALT_COUNT || 10;

async function createUser(email, password, isAdmin = false) {
  try {
    const isValidEmail = Isemail.validate(email);
    if (!isValidEmail) {
      throw new Error("Email not valid!");
    }
    if (password.length < 8) {
      throw new Error("Password length must be at least 8 characters!");
    }
    const hashedPassword = await bcrypt.hash(password, SALT_COUNT);
    const {
      rows: [user],
    } = await client.query(
      `
            INSERT INTO users(email, password, "isAdmin")
            VALUES($1, $2, $3)
            RETURNING *;
        `,
      [email, hashedPassword, isAdmin]
    );
    delete user.password;
    return user;
  } catch (err) {
    console.log(err);
    throw err;
  }
}
async function verifyUser(email, password) {
  try {
    const user = await getUserByEmail(email);
    const hashedPassword = user.password;
    const result = await bcrypt.compare(password, hashedPassword);
    if (result) {
      delete user.password;
      return user;
    } else return false;
  } catch (err) {
    console.log(err);
    throw err;
  }
}
async function getUserByEmail(email) {
  try {
    const {
      rows: [user],
    } = await client.query(
      `
            SELECT * FROM users
            WHERE email=($1);
        `,
      [email]
    );
    return user;
  } catch (err) {
    console.log(err);
    throw err;
  }
}
async function getUserById(id) {
  try {
    const {
      rows: [user],
    } = await client.query(
      `
            SELECT * FROM users
            WHERE id=($1);
        `,
      [id]
    );
    delete user.password;
    return user;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

module.exports = {
  createUser,
  getUserByEmail,
  getUserById,
  verifyUser,
};

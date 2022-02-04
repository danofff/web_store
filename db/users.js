const client = require("./client");
const bcrypt = require("bcrypt");
var Isemail = require("isemail");
const SALT_COUNT = parseInt(process.env.SALT_COUNT) || 10;

async function createUser(
  email,
  password,
  address = null,
  zip = null,
  isAdmin = false,
  userZero = false
) {
  try {
    const isValidEmail = Isemail.validate(email);
    if (!isValidEmail) {
      throw new Error("Email not valid!");
    }
    if (password.length < 8) {
      throw new Error("Password length must be at least 8 characters!");
    }
    const hashedPassword = await bcrypt.hash(password, SALT_COUNT);
    if (userZero) {
      const {
        rows: [user],
      } = await client.query(
        `
              INSERT INTO users(email, password, address, zip, "isAdmin", id)
              VALUES($1, $2, $3, $4, $5, $6)
              RETURNING *;
          `,
        [email, hashedPassword, address, zip, isAdmin, 0]
      );
      delete user.password;
      return user;
    } else {
      const {
        rows: [user],
      } = await client.query(
        `
              INSERT INTO users(email, password, address, zip, "isAdmin")
              VALUES($1, $2, $3, $4, $5)
              RETURNING *;
          `,
        [email, hashedPassword, address, zip, isAdmin]
      );
      delete user.password;
      return user;
    }
  } catch (error) {
    console.log(error);
    throw error;
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
  } catch (error) {
    console.log(error);
    throw error;
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
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function changePassword(passwordOld, passwordNew, userId) {
  try {
    if (passwordNew < 8 || passwordOld < 8) {
      throw new Error("Passowrds should be at least 8 characters long");
    }
    const {
      rows: [user],
    } = await client.query(
      `SELECT * from users
       WHERE id=$1`,
      [userId]
    );
    const hashedPassword = user.password;
    const result = await bcrypt.compare(passwordOld, hashedPassword);
    if (result) {
      const newHashedPassword = await bcrypt.hash(passwordNew, SALT_COUNT);

      await client.query(
        `
        UPDATE users
        SET password=$1
        WHERE id=$2
      `,
        [newHashedPassword, userId]
      );
      return true;
    } else {
      throw new Error("Your old password is wrong");
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
}

module.exports = {
  createUser,
  getUserByEmail,
  getUserById,
  verifyUser,
  changePassword,
};

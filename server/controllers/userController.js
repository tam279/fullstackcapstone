// userController.js

/* The code `const { PrismaClient } = require("@prisma/client");` is importing the `PrismaClient` class
from the `@prisma/client` package. */
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

/* The `exports.getUsers` function is a controller function that handles the logic for retrieving users
from the database. */
exports.getUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        company: {
          select: { id: true, name: true },
        },
        role: true,
        phoneNumber: true,
        jobTitle: true,
        deleted: true,
        tags: true,
        projectsAsTechnician: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while retrieving users" });
  }
};

const bcrypt = require("bcrypt");
const { sendWelcomeEmail } = require("../service/new-user-mail");

exports.createUser = async (req, res) => {
  const {
    email,
    firstName,
    lastName,
    password,
    companyId,
    phoneNumber,
    jobTitle,
    role,
    deleted,
    tags,
  } = req.body;

  const user = {
    email: email,
    name: `${firstName} ${lastName}`,
    password: password,
  };

  sendWelcomeEmail(user);
  try {
    // Hash the password before saving it
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        firstName,
        lastName,
        password: hashedPassword, // Store the hashed password in the database
        role,
        company: { connect: { id: companyId } },
        phoneNumber,
        jobTitle,
        deleted,
        tags,
      },
    });

    res.status(201).json(user);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while creating the user" });
  }
};

/* The `exports.updateUser` function is a controller function that handles the logic for updating a
user in the database. */
exports.updateUser = async (req, res) => {
  const id = req.params.id;

  const {
    email,
    firstName,
    lastName,
    password,
    companyId,
    phoneNumber,
    jobTitle,
    role,
    deleted,
    tags,
  } = req.body;

  let companyUpdate = companyId
    ? { company: { connect: { id: companyId } } }
    : {};

  try {
    const user = await prisma.user.update({
      where: { id },
      data: {
        email,
        firstName,
        lastName,
        password,
        role,
        ...companyUpdate,
        phoneNumber,
        jobTitle,
        deleted,
        tags,
      },
    });

    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while updating the user" });
  }
};

/* The `exports.deleteUser` function is a controller function that handles the logic for deleting a
user from the database. */
exports.deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await prisma.user.update({
      where: { id },
      data: { deleted: true },
    });

    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while deleting the user" });
  }
};

exports.changePassword = async (req, res) => {
  const { userId, newPassword } = req.body;

  try {
    const user = await prisma.user.update({
      where: { id: userId },
      data: { password: newPassword },
    });

    res.status(200).json({ message: "Password changed successfully" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while changing the password" });
  }
};

// Ian need for User Login
// exports.getUserByEmail = async (email) => {
//     if (typeof email !== 'string' || email === '') {
//         throw new Error('Invalid email parameter');
//     }

//     const query = `
//       SELECT *
//       FROM USER
//       WHERE EMAIL = ?;
//     `;

//     const [results] = await db.query(query, [email]);

//     if (results.length === 0) {
//       throw new Error('User not found');
//     }

//     return results[0];
// };

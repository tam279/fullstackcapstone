// userController.js

const mysql = require("mysql2/promise");
const bcrypt = require("bcrypt");
const db = require("../db/database");

// getUsers will get email, firstname, lastname, company,role, phoneNumber, jobTitle, deleted
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.getUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        email: true,
        firstName: true,
        lastName: true,
        company: {
          select: { name: true },
        },
        role: true,
        phoneNumber: true,
        jobTitle: true,
        deleted: true,
      },
    });

    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while retrieving users" });
  }
};

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
  } = req.body;

  try {
    const user = await prisma.user.create({
      data: {
        email,
        firstName,
        lastName,
        password,
        role,
        company: { connect: { id: companyId } },
        phoneNumber,
        jobTitle,
        deleted,
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

exports.updateUser = async (req, res) => {
  const id = req.params.id; // Extract the id parameter correctly
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

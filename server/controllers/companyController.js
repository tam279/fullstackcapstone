// companyController.js

const mysql = require("mysql2/promise");
const bcrypt = require("bcrypt");
const db = require("../db/database");

// getUsers will get email, firstname, lastname, company,role, phoneNumber, jobTitle, deleted
const prisma = require("../prisma/prisma");

// getCompanies will get name, address, phoneNumber, website, deleted from Company.
exports.getCompanies = async (req, res) => {
  try {
    const companies = await prisma.company.findMany({
      select: {
        id: true,
        name: true,
        address: true,
        phoneNumber: true,
        website: true,
        deleted: true,
      },
    });

    res.status(200).json(companies);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while retrieving companies" });
  }
};

exports.createCompany = async (req, res) => {
  const { name, address, phoneNumber, website } = req.body;

  try {
    const company = await prisma.company.create({
      data: {
        name,
        address,
        phoneNumber,
        website,
      },
    });

    res.status(201).json(company);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while creating the company" });
  }
};

exports.updateCompany = async (req, res) => {
  const { id } = req.params;
  const { name, address, phoneNumber, website, deleted } = req.body;

  try {
    const company = await prisma.company.update({
      where: { id },
      data: {
        name,
        address,
        phoneNumber,
        website,
        deleted,
      },
    });

    res.status(200).json(company);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while updating the company" });
  }
};

exports.deleteCompany = async (req, res) => {
  const { id } = req.params;

  try {
    const company = await prisma.company.update({
      where: { id },
      data: { deleted: true },
    });

    res.status(200).json(company);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while deleting the company" });
  }
};

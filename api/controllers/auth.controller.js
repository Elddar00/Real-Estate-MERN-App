import bcrypt from "bcrypt";
import prisma from "../lib/prisma.js";

export const register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // HASH PASSWORD

    const hashedPassword = await bcrypt.hash(password, 10);

    console.log(hashedPassword);

    // CREATE A NEW USER AND SAVE TO DB
    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });

    console.log(newUser);

    res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to create user" });
  }
};

export const login = (req, res) => {
  const { username, password } = req.body;

  // CHECK IF THE USER EXIST

  // CHECK IF THE PASSWORD IS CORRECT

  // GENERATE COOKIE TOKEN AND SEND TO USER
};

export const logout = (req, res) => {
  //db operations
};

const express = require("express");
const userRouter = express.Router();
const jwt = require("jsonwebtoken");
const { signUpBody, signInBody, updateInfoBody } = require("../types");
const { User, Account } = require("../db");
const authMiddleware = require("../middleware");
require("dotenv").config();

userRouter.post("/signup", async (req, res) => {
  const parsedPayload = signUpBody.safeParse(req.body);
  if (!parsedPayload.success) {
    return res.status(400).json({
      success: false,
      message: "Invalid inputs",
    });
  }
  const username = req.body.username;
  const password = req.body.password;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;

  const userExist = await User.findOne({
    username: username,
  });
  if (userExist) {
    return res.status(411).json({
      success: false,
      message: "Email already taken",
    });
  }

  const user = await User.create({
    username: username,
    password: password,
    firstName: firstName,
    lastName: lastName,
  });
  if (user) {
    const token = jwt.sign(
      {
        userId: user._id,
      },
      process.env.JWT_SECRET
    );
    await Account.create({
      userId: user._id,
      balance: 100 + Math.random() * 10000,
    });
    res.status(200).json({
      success: true,
      message: "Signed up successfully",
      token,
    });
  } else {
    res.status(404).json({
      success: false,
      message: "Sign up failed",
    });
  }
});

userRouter.post("/signin", async (req, res) => {
  const parsedPayload = signInBody.safeParse(req.body);
  if (!parsedPayload.success) {
    return res.status(411).json({
      success: false,
      message: "Invalid inputs",
    });
  }
  const username = req.body.username;
  const password = req.body.password;
  const user = await User.findOne({
    username,
    password,
  });
  if (user) {
    const token = jwt.sign(
      {
        userId: user._id,
      },
      process.env.JWT_SECRET
    );
    res.status(200).json({
      success: true,
      token: token,
      message: "Signed in successfully",
    });
  } else {
    res.status(411).json({
      success: false,
      message: "Incorrect password",
    });
  }
});

userRouter.post("/login", authMiddleware, (req, res) => {
  res.status(200).json({
    success: true,
    message: "You are already logged in",
  });
});

userRouter.put("/updatename", authMiddleware, async (req, res) => {
  const parsedPayload = updateInfoBody.safeParse(req.body);
  if (!parsedPayload.success) {
    return res.status(411).json({
      success: false,
      message: "Invalid inputs",
    });
  }
  const user = await User.findOneAndUpdate({ _id: req.userId }, req.body);
  if (user) {
    res.status(200).json({
      success: true,
      message: "Name updated successfully",
    });
  } else {
    res.status(411).json({
      success: false,
      message: "Error while updating information",
    });
  }
});

userRouter.get("/info", authMiddleware, async (req, res) => {
  const user = await User.findOne({ _id: req.userId });
  if (user) {
    res.status(200).json({
      success: true,
      message: "User information fetched successfully",
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.username,
    });
  } else {
    res.status(411).json({
      success: false,
      message: "Error while fetching information",
    });
  }
});

userRouter.get("/bulk", async (req, res) => {
  const filter = req.query.filter || "";
  const users = await User.find({
    $or: [
      {
        firstName: {
          $regex: filter,
          $options: "i",
        },
      },
      {
        lastName: {
          $regex: filter,
          $options: "i",
        },
      },
    ],
  });
  if (users) {
    res.status(200).json({
      success: true,
      users: users.map((user) => ({
        _id: user._id,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
      })),
    });
  } else {
    res.status(411).json({
      success: false,
      message: "Error while fetching users",
    });
  }
});

module.exports = userRouter;

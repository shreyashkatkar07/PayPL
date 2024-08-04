const express = require("express");
const mongoose = require("mongoose");
const accountRouter = express.Router();
const { Account } = require("../db");
const authMiddleware = require("../middleware");

accountRouter.get("/balance", authMiddleware, async (req, res) => {
  const account = await Account.findOne({
    userId: req.userId,
  });
  if (account) {
    const balance = account.balance;
    res.status(200).json({
      success: true,
      balance: balance,
      message: "Balanced fetched successfully",
    });
  } else {
    res.status(404).json({
      success: false,
      message: "Account not found",
    });
  }
});

accountRouter.put("/transfer", authMiddleware, async (req, res) => {
  const session = await mongoose.startSession();

  session.startTransaction();
  const { amount, to } = req.body;

  const sender = await Account.findOne({ userId: req.userId }).session(session);

  if (!sender || sender.balance < amount) {
    await session.abortTransaction();
    return res.status(400).json({
      success: false,
      message: "Insufficient balance",
    });
  }

  const receiver = await Account.findOne({ userId: to }).session(session);

  if (!receiver) {
    await session.abortTransaction();
    return res.status(400).json({
      success: false,
      message: "Invalid account",
    });
  }

  await Account.updateOne(
    { userId: req.userId },
    { $inc: { balance: -amount } }
  ).session(session);
  await Account.updateOne(
    { userId: to },
    { $inc: { balance: amount } }
  ).session(session);

  await session.commitTransaction();
  res.status(200).json({
    success: true,
    message: "Transfer successful",
  });
});

//bad approach -
// accountRouter.put("/transfer", async (req, res) => {
//   const { amount, to } = req.body;
//   const sender = Account.findOne({
//     userId: req.userId,
//   });
//   if (!sender || sender.balance < amount) {
//     res.status(400).json({
//       success: false,
//       message: "Insufficient balance",
//     });
//   }
//   const receiver = Account.findOne({
//     userId: req.body.to,
//   });
//   if (!receiver) {
//     res.status(400).json({
//       success: false,
//       message: "Invalid Account",
//     });
//   }
//   await Account.updateOne(
//     { userId: req.userId },
//     { $inc: { balance: -amount } }
//   );
//   await Account.updateOne({ userId: to }, { $inc: { balance: amount } });

//   res.send(200).json({
//     success: true,
//     message: "Transfer successful",
//   });
// });

module.exports = accountRouter;

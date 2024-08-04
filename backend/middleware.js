const jwt = require("jsonwebtoken");
require("dotenv").config();

const authMiddleware = (req, res, next) => {
  const bearerToken = req.headers.authorization;
  const jwtToken = bearerToken.split(" ")[1];
  try {
    const verifiedToken = jwt.verify(jwtToken, process.env.JWT_SECRET);
    req.userId = verifiedToken.userId;
    next();
  } catch (err) {
    console.log(err);
    res.status(403).json({
      success: false,
      message: "Invalid token",
    });
  }
};

module.exports = authMiddleware;

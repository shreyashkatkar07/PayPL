const zod = require("zod");

const signUpBody = zod.object({
  username: zod.string().email(),
  password: zod.string().min(6),
  firstName: zod.string(),
  lastName: zod.string(),
});

const signInBody = zod.object({
  username: zod.string().email(),
  password: zod.string().min(6),
});

const updateInfoBody = zod.object({
  password: zod.string().min(6).optional(),
  firstName: zod.string().optional(),
  lastName: zod.string().optional(),
});


module.exports = {
  signUpBody,
  signInBody,
  updateInfoBody,
};

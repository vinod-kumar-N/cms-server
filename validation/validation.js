const userValidate = require("@hapi/joi");

const validateRegistration = (req) => {
  const schema = userValidate.object({
    name: userValidate.string().min(5).required(),
    password: userValidate.string().min(6).required(),
    email: userValidate.string().min(6).required().email(),
    designation: userValidate.string().required(),
  });

  return schema.validate(req);
};

const validateLogin = (req) => {
  const schema = userValidate.object({
    email: userValidate.string().min(6).required().email(),
    password: userValidate.string().min(6).required(),
  });

  return schema.validate(req);
};

module.exports.validateRegistration = validateRegistration;
module.exports.validateLogin = validateLogin;

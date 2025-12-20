const { validationResult } = require("express-validator");

const validateSingleError = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const firstError = errors.array({ onlyFirstError: true })[0];

    return res.status(422).json({
      status: false,
      message: firstError.msg,
    });
  }

  next();
};

module.exports = validateSingleError;
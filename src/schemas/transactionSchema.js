import joi from "joi";

const transactionSchema = joi.object({
  value: joi
    .string()
    .required()
    .pattern(/^[\d,.?!]+$/),
  type: joi.string().required().valid("deposit", "withdraw"),
  description: joi
    .string()
    .required()
    .pattern(/^[^-\s][\w\s-]+/),
});

export default transactionSchema;

import joi from "joi";

const valueSchema = joi.object({
  addValue: joi
    .string()
    .pattern(/^[\d,.?!]+$/)
    .required(),
  type: joi.string().required().valid("deposit", "withdraw"),
  description: joi.string().required(),
});

export default valueSchema;

import Joi from "joi";

const postSchemaValidation = Joi.object({
    title: Joi.string().required().trim(),
    content: Joi.string().required().trim(),
    price: Joi.string().required().trim(),
    status: Joi.string().valid("SOLD_OUT", "FOR_SALE").trim(),
});

const userSchemaValidation = Joi.object({
    email: Joi.string().required().trim(),
    password: Joi.string().min(6).required().trim(),
    nickname: Joi.string().required().trim(),
    confirmPassword: Joi.ref("password"),
});

const userLoginSchemaValidation = Joi.object({
    email: Joi.string().required().trim(),
    password: Joi.string().min(6).required().trim(),
});

export {
    postSchemaValidation,
    userSchemaValidation,
    userLoginSchemaValidation,
};

import Joi from "joi";

const fieldsMissing = 'All fields must be filled';

export const validateUser = (body: object) => {
    const schemaUser = Joi.object({
    email: Joi.string().email().required().messages({
        'string.empty': fieldsMissing,
    }),
    password: Joi.string().required().min(6).messages({
        'string.empty': fieldsMissing,
        'string.required': fieldsMissing,
    })
});

  const { error, value } = schemaUser.validate(body);

    if (error) {
        const err = new Error(error.details[0].message);
        err.name = 'BadRequest';
        throw err;
    }

    return value;
};
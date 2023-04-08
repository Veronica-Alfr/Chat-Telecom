import Joi from "joi";

const fieldsMissing = 'All fields must be filled';

export const validateRegister = (body: object) => {
    const schemaRegister = Joi.object({
    name: Joi.string().required().min(6).messages({
        'string.empty': fieldsMissing,
    }),     
    email: Joi.string().regex(/(.+)@(.+){2,}\.(.+){2,}/).required().messages({
        'string.empty': fieldsMissing,
    }),
    password: Joi.string().required().min(6).messages({
        'string.empty': fieldsMissing,
        'string.required': fieldsMissing,
    })
});

  const { error, value } = schemaRegister.validate(body);

    if (error) {
        const err = new Error(error.details[0].message);
        err.name = 'BadRequest';
        throw err;
    }

    return value;
};

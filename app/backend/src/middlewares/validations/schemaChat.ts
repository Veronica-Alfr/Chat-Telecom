import Joi from "joi";

const fieldsMissing = 'All fields must be filled';

export const validateMessage = (body: object) => {
    const schemaMessage = Joi.object({
    name: Joi.string().required().min(6).messages({
        'string.empty': fieldsMissing,
    }),
    roomId: Joi.number().required(),
    message: Joi.string().required(),
    time: Joi.string().required(),
});

  const { error, value } = schemaMessage.validate(body);

    if (error) {
        const err = new Error(error.details[0].message);
        err.name = 'BadRequest';
        throw err;
    }

    return value;
};

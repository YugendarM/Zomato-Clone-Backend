import joi from "joi";

export const ValidateUserId = (userData) => {
    const Schema = joi.object({
        _id: joi.string().required()
    });

    return Schema.validateAsync(userData);
};

export const ValidateUserUpdate = (userData) => {
    const Schema = joi.object({
        fullName: joi.string().required().min(4),
        password: joi.string().min(5),
        email: joi.string().email(),
        address: joi.array().items(joi.object({detail: joi.string(), for: joi.string()})),
        phoneNumber: joi.number()

    });

    return Schema.validateAsync(userData);
};


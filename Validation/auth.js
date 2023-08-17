import joi from "joi";

export const ValidateSignUp = (userData) => {
    const Schema = joi.object({
        fullName: joi.string().required().min(4),
        password: joi.string().min(5),
        email: joi.string().email(),
        address: joi.array().items(joi.object({detail: joi.string(), for: joi.string()})),
        phoneNumber: joi.number()
    });

    return Schema.validateAsync(userData);
};


export const ValidateSignIn = (userData) => {
    const Schema = joi.object({
        password: joi.string().min(5).required(),
        email: joi.string().email().required(),
    });

    return Schema.validateAsync(userData);
};

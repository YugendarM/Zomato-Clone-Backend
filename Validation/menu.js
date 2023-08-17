import joi from "joi";

export const ValidateMenuId = (menuData) => {
    const Schema = joi.object({
        _id: joi.string().required()
    });

    return Schema.validateAsync(menuData);
};


export const ValidateImageId = (menuData) => {
    const Schema = joi.object({
        _id: joi.string().required()
    });

    return Schema.validateAsync(menuData);
};

import joi from "joi";

export const ValidateOrderId = (orderData) => {
    const Schema = joi.object({
        _id: joi.string().required()
    });

    return Schema.validateAsync(orderData);
};


export const ValidateOrder = (orderData) => {
    const Schema = joi.object({

        user: joi.string(),

        orderDetails: joi.array().items(joi.object({
            food: joi.string().required(),
            quantity: joi.number().required(),
            paymode: joi.string().required(),
            status: joi.string(),
            paymentDetails: joi.array().items(joi.object({
                itemTotal: joi.number().required(),
                promo: joi.number().required(),
                tax: joi.number().required()
            })),
        })),

        orderRatings: joi.number().required()


    });

    return Schema.validateAsync(orderData);
};

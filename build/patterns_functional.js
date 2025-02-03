"use strict";
//*--------- Chain of Responsibility
const required = (value) => {
    if (!value)
        return "Field is required";
    return null;
};
const mail = (value) => {
    const regexp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regexp.test(value))
        return "Failed email";
    return null;
};
const validator = (values) => {
    return (value) => {
        for (const val of values) {
            const error = val(value);
            if (error)
                return error;
        }
        return null;
    };
};
const resValidator = validator([required, mail]);
console.log(resValidator("ert@gjh.com"));
// ------------------------
console.log("---------repeat");
const loggerFnc = (req, next) => {
    console.log("logger", req);
    return next();
};
const authFnc = (req, next) => {
    if (!req.user) {
        return "Unautorized";
    }
    return next();
};
const handlerFnc = (req) => {
    return `Request for ${req.user}`;
};
const composeMiddleware = (middlewares) => {
    return (req) => {
        const dispatch = (index) => {
            if (index < dispatch.length) {
                const middleware = middlewares[index];
                return middleware(req, () => dispatch(index + 1));
            }
        };
        return dispatch(0);
    };
};
const pipeline = composeMiddleware([loggerFnc, authFnc, handlerFnc]);

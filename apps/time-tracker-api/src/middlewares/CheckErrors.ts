import { RequestHandler } from "express";
import { validationResult } from "express-validator";
import { ResponseType } from "@/types/ResponseType";

type CheckErrorsHandler = RequestHandler<object, ResponseType<object>, object, object>;
export const CheckErrors: CheckErrorsHandler = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(406).json({
            ok: false,
            msg: "Invalid data",
            errors: errors.array().map((e) => e.msg),
        });
    }

    next();
};

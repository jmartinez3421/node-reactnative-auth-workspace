import { RequestHandler } from "express";
import jwt from "jsonwebtoken";
import { JwtPayload } from "@/types/JwtPayload";
import { DocumentUser, UserModel } from "@/db/models/user";
import { ErrorCodes, ResponseType } from "@/types/ResponseType";

type JWTValidatorHandler = RequestHandler<
    object,
    ResponseType<object>,
    { uid: string; loggedUser: DocumentUser },
    object
>;
/**
 * Check if the JWT is valid and if the user exists and is active, then add the user to the request body
 * @param req
 * @param res
 * @param next
 * @constructor
 */
export const JWTValidator: JWTValidatorHandler = async (req, res, next) => {
    const token = req.header("X-Auth");

    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: ErrorCodes.NoTokenProvided,
        });
    }

    try {
        const { uid } = jwt.verify(token, process.env.JWT_KEY!) as JwtPayload;

        //Get the logged user information
        const loggedUser = await UserModel.findById<DocumentUser>(uid);

        //Verify if the user exists
        if (!loggedUser) {
            return res.status(404).json({
                ok: false,
                msg: ErrorCodes.UserNotFound,
            });
        }

        //Verify if the user is active
        if (!loggedUser.status) {
            return res.status(400).json({
                ok: false,
                msg: ErrorCodes.InactiveUser,
            });
        }

        req.body.uid = uid;
        req.body.loggedUser = loggedUser;

        next();
    } catch (err) {
        console.log(err);
        return res.status(401).json({
            ok: false,
            msg: ErrorCodes.InvalidToken,
        });
    }
};

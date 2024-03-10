import { RequestHandler } from "express";
import { DocumentUser } from "@/db/models/user";
import bcryptjs from "bcryptjs";

type CheckPasswordHandler = RequestHandler<
    object,
    { msg: string },
    { loggedUser: DocumentUser; password: string },
    object
>;

/**
 * Checks if the password that the user is sending is the same as the one in the database <br />
 * This middleware should be used always after the JWTValidator middleware
 * @param req
 * @param res
 * @param next
 * @constructor
 */
export const CheckPassword: CheckPasswordHandler = (req, res, next) => {
    const { password, loggedUser } = req.body;
    if (password) {
        const isValid = bcryptjs.compareSync(password, loggedUser.password);
        if (!isValid) {
            return res.status(401).json({
                msg: `The current password does not match`,
            });
        }
    } else return res.status(400).json({ msg: "The password is required" });

    next();
};

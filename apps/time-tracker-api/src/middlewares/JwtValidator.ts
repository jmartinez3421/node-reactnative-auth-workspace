import { RequestHandler } from "express";
import jwt from "jsonwebtoken";
import { JwtPayload } from "@/types/JwtPayload";
import { DocumentUser, UserModel } from "@/db/models/user";
import { ResponseType } from "@/types/ResponseType";

type JWTValidatorHandler = RequestHandler<
    object,
    ResponseType<object>,
    { uid: string; loggedUser: DocumentUser },
    object
>;
export const JWTValidator: JWTValidatorHandler = async (req, res, next) => {
    const token = req.header("X-Auth");

    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: `There isn't any token in the request`,
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
                msg: "No user with this uid",
            });
        }

        //Verify if the user is active
        if (!loggedUser.status) {
            return res.status(400).json({
                ok: false,
                msg: "The user is inactive",
            });
        }

        req.body.uid = uid;
        req.body.loggedUser = loggedUser;

        next();
    } catch (err) {
        console.log(err);
        return res.status(401).json({
            ok: false,
            msg: `The JWT is not valid`,
        });
    }
};

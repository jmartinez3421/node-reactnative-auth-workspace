import { RequestHandler } from "express";
import { ResponseType } from "@/types/ResponseType";
import { DocumentUser, UserModel } from "@/db/models/user";
import bcrypt from "bcryptjs";
import { generateJWT } from "@/helpers/generateJWT";

type LoginHandler = RequestHandler<
    object,
    ResponseType<{ token: string }>,
    { email: string; password: string },
    object
>;
const Login: LoginHandler = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await UserModel.findOne({ email });
        if (!user || !user.status) {
            return res.status(404).json({
                ok: false,
                msg: "User not found",
            });
        }
        const validPassword = bcrypt.compareSync(password, user.password);
        if (!validPassword) {
            return res.status(401).json({
                ok: false,
                msg: "Invalid password",
            });
        }
        const token = await generateJWT(user.id);
        res.json({
            ok: true,
            data: { token },
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Internal server error",
        });
    }
};

type RenewHandler = RequestHandler<object, ResponseType<{ token: string }>, { loggedUser: DocumentUser }, object>;
const Renew: RenewHandler = async (req, res) => {
    const { loggedUser } = req.body;
    try {
        const token = await generateJWT(loggedUser.id);
        res.json({
            ok: true,
            data: { token },
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Internal server error",
        });
    }
};

export default {
    Login,
    Renew,
};

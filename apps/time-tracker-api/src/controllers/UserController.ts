import { RequestHandler } from "express";
import { ResponseType } from "@/types/ResponseType";
import { User } from "@/types/User";
import { DocumentUser, UserModel } from "@/db/models/user";
import { parseDocumentUser } from "@/helpers/userHelpers";
import { cryptPassword } from "@/helpers/cryptPassword";
import { generateJWT } from "@/helpers/generateJWT";

type GetUserHandler = RequestHandler<object, ResponseType<User>, { loggedUser: DocumentUser }, object>;
const GetUser: GetUserHandler = async (req, res) => {
    const { loggedUser } = req.body;
    try {
        const user = parseDocumentUser(loggedUser);
        return res.json({
            ok: true,
            data: user,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: "Internal server error",
        });
    }
};

type CreateUserHandler = RequestHandler<
    object,
    ResponseType<{ token: string }>,
    {
        name: string;
        email: string;
        password: string;
    },
    object
>;
const CreateUser: CreateUserHandler = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const user = new UserModel({
            name,
            email,
            password,
        });

        user.password = cryptPassword(password);

        await user.save();

        const token = await generateJWT(user._id);

        return res.json({
            ok: true,
            data: {
                token,
            },
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: "Internal server error",
        });
    }
};

type UpdateUserHandler = RequestHandler<
    object,
    ResponseType<User>,
    {
        name?: string;
        newPassword?: string;
        loggedUser: DocumentUser;
    },
    object
>;
const UpdateUser: UpdateUserHandler = async (req, res) => {
    const { loggedUser, name, newPassword } = req.body;
    try {
        if (newPassword) loggedUser.password = cryptPassword(newPassword);
        if (name) loggedUser.name = name;

        await loggedUser.save();

        return res.json({
            ok: true,
            data: parseDocumentUser(loggedUser),
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: "Internal server error",
        });
    }
};

type DeleteUserHandler = RequestHandler<object, ResponseType<{ msg: string }>, { loggedUser: DocumentUser }, object>;
const DeleteUser: DeleteUserHandler = async (req, res) => {
    const { loggedUser } = req.body;
    try {
        await loggedUser.updateOne({ status: false });
        res.json({
            ok: true,
            data: { msg: `The user has been deleted` },
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            ok: false,
            msg: "Internal server error",
        });
    }
};

export default {
    GetUser,
    CreateUser,
    UpdateUser,
    DeleteUser,
};

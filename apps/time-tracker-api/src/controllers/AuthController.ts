import { RequestHandler } from "express";
import { ResponseType } from "@/types/ResponseType";
import { DocumentUser, UserModel } from "@/db/models/user";
import bcrypt from "bcryptjs";
import { generateJWT } from "@/helpers/generateJWT";
import { TokenModel } from "@/db/models/token";
import { cryptPassword } from "@/helpers/cryptPassword";
import { sendEmail } from "@/helpers/email/sendEmail";
import { generateRecoverCode } from "@/helpers/userHelpers";

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

type RequestNewPasswordHandler = RequestHandler<object, ResponseType<{ msg: string }>, { email: string }, object>;
const RequestNewPassword: RequestNewPasswordHandler = async (req, res) => {
    const { email } = req.body;
    try {
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(404).json({
                ok: false,
                msg: "User not found",
            });
        }
        const token = await TokenModel.findOne({ userId: user.id });
        if (token) await token.deleteOne();

        const newToken = generateRecoverCode();
        const hash = cryptPassword(newToken);

        await new TokenModel({ userId: user.id, token: hash, createdAt: Date.now() }).save();

        await sendEmail({
            email,
            subject: "Reset password",
            payload: { name: user.name, code: newToken },
            template: "./templates/restorePasswordEmailTemplate.html",
            onError: (error) => {
                console.log(error);
                return res.status(500).json({
                    ok: false,
                    msg: "Internal server error",
                });
            },
            onSuccess: () => {
                res.json({
                    ok: true,
                    data: { msg: "Reset password token sent to your email" },
                });
            },
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Internal server error",
        });
    }
};

type ResetPasswordHandler = RequestHandler<
    object,
    ResponseType<{ msg: string }>,
    { email: string; token: string; password: string },
    object
>;
const ResetPassword: ResetPasswordHandler = async (req, res) => {
    const { email, token, password } = req.body;
    try {
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(404).json({
                ok: false,
                msg: "User not found",
            });
        }
        const passwordResetToken = await TokenModel.findOne({ userId: user.id });
        if (!passwordResetToken) {
            return res.status(401).json({
                ok: false,
                msg: "Invalid or expired password reset token",
            });
        }
        const isValid = await bcrypt.compare(token, passwordResetToken.token);
        if (!isValid) {
            return res.status(401).json({
                ok: false,
                msg: "Invalid or expired password reset token",
            });
        }

        const hash = cryptPassword(password);

        await user.updateOne({ password: hash });
        await passwordResetToken.deleteOne();

        await sendEmail({
            email,
            subject: "Password reset success",
            payload: { name: user.name },
            template: "./templates/restorePasswordSuccessTemplate.html",
            onError: (error) => {
                console.log(error);
                return res.status(500).json({
                    ok: false,
                    msg: "Internal server error",
                });
            },
            onSuccess: () => {
                res.json({
                    ok: true,
                    data: { msg: "Password reset success" },
                });
            },
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
    RequestNewPassword,
    ResetPassword,
};

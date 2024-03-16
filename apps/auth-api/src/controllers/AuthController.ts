import { RequestHandler } from "express";
import { ErrorCodes, ResponseType } from "@/types/ResponseType";
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
    { email: string; password: string; remember?: boolean },
    object
>;
/**
 * Checks if the user exists and the password is correct. If so, it returns a JWT token.
 * @param req
 * @param res
 * @constructor
 */
const Login: LoginHandler = async (req, res) => {
    const { email, password, remember } = req.body;
    try {
        const user = await UserModel.findOne({ email });
        if (!user || !user.status) {
            return res.status(404).json({
                ok: false,
                msg: ErrorCodes.UserNotFound,
            });
        }
        const validPassword = bcrypt.compareSync(password, user.password);
        if (!validPassword) {
            return res.status(401).json({
                ok: false,
                msg: ErrorCodes.InvalidPassword,
            });
        }
        const token = await generateJWT(user.id, remember);
        res.json({
            ok: true,
            data: { token },
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: ErrorCodes.InternalError,
        });
    }
};

type RenewHandler = RequestHandler<object, ResponseType<{ token: string }>, { loggedUser: DocumentUser }, object>;

/**
 * Generates a new JWT token for the user.
 * @param req
 * @param res
 * @constructor
 */
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
            msg: ErrorCodes.InternalError,
        });
    }
};

type RequestNewPasswordHandler = RequestHandler<object, ResponseType<{ msg: string }>, { email: string }, object>;
/**
 * Checks if there is some user with the given email. If so, it sends an email with a token to reset the password.
 * @param req
 * @param res
 * @constructor
 */
const RequestNewPassword: RequestNewPasswordHandler = async (req, res) => {
    const { email } = req.body;
    try {
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(404).json({
                ok: false,
                msg: ErrorCodes.UserNotFound,
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
                    msg: ErrorCodes.InternalError,
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
            msg: ErrorCodes.InternalError,
        });
    }
};

type ResetPasswordHandler = RequestHandler<
    object,
    ResponseType<{ msg: string }>,
    { email: string; token: string; password: string },
    object
>;
/**
 * Checks if the user exists and the token is valid. If so, it updates the password.
 * @param req
 * @param res
 * @constructor
 */
const ResetPassword: ResetPasswordHandler = async (req, res) => {
    const { email, token, password } = req.body;
    try {
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(404).json({
                ok: false,
                msg: ErrorCodes.UserNotFound,
            });
        }
        const passwordResetToken = await TokenModel.findOne({ userId: user.id });
        if (!passwordResetToken) {
            return res.status(401).json({
                ok: false,
                msg: ErrorCodes.InvalidResetToken,
            });
        }
        const isValid = await bcrypt.compare(token, passwordResetToken.token);
        if (!isValid) {
            return res.status(401).json({
                ok: false,
                msg: ErrorCodes.InvalidResetToken,
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
                    msg: ErrorCodes.InternalError,
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
            msg: ErrorCodes.InternalError,
        });
    }
};

export default {
    Login,
    Renew,
    RequestNewPassword,
    ResetPassword,
};

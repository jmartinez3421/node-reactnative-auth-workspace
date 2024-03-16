import { check } from "express-validator";
import ValidatorsBuilder from "@/routes/validators/ValidatorsBuilder";
import { ErrorCodes } from "@/types/ResponseType";

const Login = ValidatorsBuilder.publicRoute([
    check("email", ErrorCodes.EmailRequired).notEmpty(),
    check("password", ErrorCodes.PasswordRequired).notEmpty(),
]);

const Renew = ValidatorsBuilder.privateRoute([]);

const ForgotPassword = ValidatorsBuilder.publicRoute([check("email", ErrorCodes.EmailRequired).notEmpty()]);

const ResetPassword = ValidatorsBuilder.publicRoute([
    check("email", ErrorCodes.EmailRequired).notEmpty(),
    check("token", ErrorCodes.TokenRequired).notEmpty(),
    check("password", ErrorCodes.PasswordRequired).notEmpty(),
]);

export default {
    Login,
    Renew,
    ForgotPassword,
    ResetPassword,
};

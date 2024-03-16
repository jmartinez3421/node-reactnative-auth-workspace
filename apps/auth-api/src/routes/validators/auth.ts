import { check } from "express-validator";
import ValidatorsBuilder from "@/routes/validators/ValidatorsBuilder";

const Login = ValidatorsBuilder.publicRoute([
    check("email", "EmailRequired").notEmpty(),
    check("password", "PasswordRequired").notEmpty(),
]);

const Renew = ValidatorsBuilder.privateRoute([]);

const ForgotPassword = ValidatorsBuilder.publicRoute([check("email", "EmailRequired").notEmpty()]);

const ResetPassword = ValidatorsBuilder.publicRoute([
    check("email", "EmailRequired").notEmpty(),
    check("token", "TokenRequired").notEmpty(),
    check("password", "PasswordRequired").notEmpty(),
]);

export default {
    Login,
    Renew,
    ForgotPassword,
    ResetPassword,
};

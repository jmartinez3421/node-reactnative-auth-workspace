import { check } from "express-validator";
import ValidatorsBuilder from "@/routes/validators/ValidatorsBuilder";

const Login = ValidatorsBuilder.publicRoute([
    check("email", "Email is required").notEmpty(),
    check("password", "Password is required").notEmpty(),
]);

const Renew = ValidatorsBuilder.privateRoute([]);

const ForgotPassword = ValidatorsBuilder.publicRoute([check("email", "Email is required").notEmpty()]);

const ResetPassword = ValidatorsBuilder.publicRoute([
    check("email", "Email is required").notEmpty(),
    check("token", "Token is required").notEmpty(),
    check("password", "Password is required").notEmpty(),
]);

export default {
    Login,
    Renew,
    ForgotPassword,
    ResetPassword,
};

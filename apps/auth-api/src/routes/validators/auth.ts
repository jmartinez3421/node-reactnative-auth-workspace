import { check } from "express-validator";
import { CheckErrors } from "@/middlewares/CheckErrors";
import { JWTValidator } from "@/middlewares/JwtValidator";

const Login = [
    check("email", "Email is required").notEmpty(),
    check("password", "Password is required").notEmpty(),
    CheckErrors,
];

const Renew = JWTValidator;

const ForgotPassword = [check("email", "Email is required").notEmpty(), CheckErrors];

const ResetPassword = [
    check("email", "Email is required").notEmpty(),
    check("token", "Token is required").notEmpty(),
    check("password", "Password is required").notEmpty(),
    CheckErrors,
];

export default {
    Login,
    Renew,
    ForgotPassword,
    ResetPassword,
};

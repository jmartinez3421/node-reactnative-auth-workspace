import { check } from "express-validator";
import { CheckErrors } from "@/middlewares/CheckErrors";
import { JWTValidator } from "@/middlewares/JwtValidator";

const Login = [
    check("email", "Email is required").notEmpty(),
    check("password", "Password is required").notEmpty(),
    CheckErrors,
];

const Renew = JWTValidator;

export default {
    Login,
    Renew,
};

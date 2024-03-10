import { check } from "express-validator";
import { CheckErrors } from "@/middlewares/CheckErrors";
import { existsEmail } from "@/helpers/customValidators";
import { JWTValidator } from "@/middlewares/JwtValidator";
import { CheckPassword } from "@/middlewares/CheckPassword";

const Create = [
    check("name", "The name is required").notEmpty(),
    check("email", "The email is not valid").isEmail(),
    check("email").custom(existsEmail),
    check(
        "password",
        "The password must have 8 characters, 1 Lowercase, 1 Uppercase, 1 number and 1 symbol"
    ).isStrongPassword(),
    CheckErrors,
];

const Read = [JWTValidator, CheckErrors];

const Update = [
    JWTValidator,
    CheckPassword,
    check("newPassword", "The password must have 8 characters, 1 Lowercase, 1 Uppercase, 1 number and 1 symbol")
        .if(check("newPassword").notEmpty())
        .if(check("password").notEmpty())
        .isStrongPassword(),
    CheckErrors,
];

const Delete = [JWTValidator, CheckErrors];

export default {
    Create,
    Update,
    Read,
    Delete,
};

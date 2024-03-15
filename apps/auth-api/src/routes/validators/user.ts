import { check } from "express-validator";
import { existsEmail } from "@/helpers/customValidators";
import { CheckPassword } from "@/middlewares/CheckPassword";
import ValidatorsBuilder from "@/routes/validators/ValidatorsBuilder";

const Create = ValidatorsBuilder.publicRoute([
    check("name", "The name is required").notEmpty(),
    check("email", "The email is not valid").isEmail(),
    check("email").custom(existsEmail),
    check(
        "password",
        "The password must have 8 characters, 1 Lowercase, 1 Uppercase, 1 number and 1 symbol"
    ).isStrongPassword(),
]);

const Read = ValidatorsBuilder.privateRoute([]);

const Update = ValidatorsBuilder.privateRoute([
    CheckPassword,
    check("newPassword", "The password must have 8 characters, 1 Lowercase, 1 Uppercase, 1 number and 1 symbol")
        .if(check("newPassword").notEmpty())
        .if(check("password").notEmpty())
        .isStrongPassword(),
]);

const Delete = ValidatorsBuilder.privateRoute([]);

export default {
    Create,
    Update,
    Read,
    Delete,
};

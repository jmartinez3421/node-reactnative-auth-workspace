import { check } from "express-validator";
import { existsEmail } from "@/helpers/customValidators";
import { CheckPassword } from "@/middlewares/CheckPassword";
import ValidatorsBuilder from "@/routes/validators/ValidatorsBuilder";

const Create = ValidatorsBuilder.publicRoute([
    check("name", "NameRequired").notEmpty(),
    check("email", "InvalidEmail").isEmail(),
    check("email").custom(existsEmail),
    check("password", "InvalidPassword").isStrongPassword(),
]);

const Read = ValidatorsBuilder.privateRoute([]);

const Update = ValidatorsBuilder.privateRoute([
    CheckPassword,
    check("newPassword", "InvalidPassword")
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

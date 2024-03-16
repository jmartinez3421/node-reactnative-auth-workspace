import { check } from "express-validator";
import { existsEmail } from "@/helpers/customValidators";
import { CheckPassword } from "@/middlewares/CheckPassword";
import ValidatorsBuilder from "@/routes/validators/ValidatorsBuilder";
import { ErrorCodes } from "@/types/ResponseType";

const Create = ValidatorsBuilder.publicRoute([
    check("name", ErrorCodes.NameRequired).notEmpty(),
    check("email", ErrorCodes.InvalidEmail).isEmail(),
    check("email").custom(existsEmail),
    check("password", ErrorCodes.InvalidPassword).isStrongPassword(),
]);

const Read = ValidatorsBuilder.privateRoute([]);

const Update = ValidatorsBuilder.privateRoute([
    CheckPassword,
    check("newPassword", ErrorCodes.InvalidPassword)
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

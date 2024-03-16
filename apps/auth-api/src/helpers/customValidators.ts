import { UserModel } from "@/db/models/user";
import { ErrorCodes } from "@/types/ResponseType";

/**
 * Check if the email is already registered
 * @param email
 */
export const existsEmail = async (email: string) => {
    const dbUser = await UserModel.findOne({ email });
    if (dbUser) {
        throw new Error(ErrorCodes.EmailAlreadyExists);
    }
};

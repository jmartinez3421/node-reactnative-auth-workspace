import { UserModel } from "@/db/models/user";

export const existsEmail = async (email: string) => {
    const dbUser = await UserModel.findOne({ email });
    if (dbUser) {
        throw new Error(`The email ${email} is already registered`);
    }
};

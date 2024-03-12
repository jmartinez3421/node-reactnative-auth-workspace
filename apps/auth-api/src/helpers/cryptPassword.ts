import bcryptjs from "bcryptjs";

/**
 * Crypt password using bcryptjs and return the hash
 * @param password
 */
export const cryptPassword = (password: string) => {
    const salt = bcryptjs.genSaltSync();
    return bcryptjs.hashSync(password, salt);
};

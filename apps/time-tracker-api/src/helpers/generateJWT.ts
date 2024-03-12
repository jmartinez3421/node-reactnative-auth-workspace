import jwt from "jsonwebtoken";

/**
 * Generate a JWT token with the given uid. If remember is true, the token will expire in 30 days, otherwise it will expire in 12 hours.
 * @param uid
 * @param remember
 */
export const generateJWT = (uid: string, remember?: boolean) =>
    new Promise<string>((resolve, reject) => {
        const payload = { uid };

        jwt.sign(
            payload,
            process.env.JWT_KEY ?? "default_key",
            {
                expiresIn: remember ? "30 days" : "12h",
            },
            (err, token) => {
                if (token) {
                    resolve(token);
                } else {
                    console.log(err);
                    reject(`There was an error while generating the token`);
                }
            }
        );
    });

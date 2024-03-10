import jwt from "jsonwebtoken";

export const generateJWT = (uid: string) =>
    new Promise<string>((resolve, reject) => {
        const payload = { uid };

        jwt.sign(
            payload,
            process.env.JWT_KEY ?? "default_key",
            {
                expiresIn: "12h",
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

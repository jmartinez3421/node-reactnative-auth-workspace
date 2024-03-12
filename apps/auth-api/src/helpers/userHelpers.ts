import { DocumentUser } from "@/db/models/user";
import { PublicUser } from "@/types/User";

/**
 * Parse a DocumentUser into a PublicUser
 * @param user
 */
export const parseDocumentUser = (user: DocumentUser): PublicUser => ({
    id: user._id,
    name: user.name,
    email: user.email,
    status: user.status,
});

/**
 * Generate a random 6-digit code to recover the password
 */
export const generateRecoverCode = (): string => {
    // Create an array of 6 random numbers
    const randomNumbers = Array.from({ length: 6 }, () => Math.floor(Math.random() * 10));

    // Join the array into a string
    return randomNumbers.join("");
};

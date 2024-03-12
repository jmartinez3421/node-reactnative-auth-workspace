import { DocumentUser } from "@/db/models/user";
import { PublicUser } from "@/types/User";

export const parseDocumentUser = (user: DocumentUser): PublicUser => ({
    id: user._id,
    name: user.name,
    email: user.email,
    status: user.status,
});

export const generateRecoverCode = (): string => {
    // Create an array of 6 random numbers
    const numerosAleatorios = Array.from({ length: 6 }, () => Math.floor(Math.random() * 10));

    // Join the array into a string
    const codigoAleatorio = numerosAleatorios.join("");
    return codigoAleatorio;
};

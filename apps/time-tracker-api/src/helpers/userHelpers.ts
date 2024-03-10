import { DocumentUser } from "@/db/models/user";
import { PublicUser } from "@/types/User";

export const parseDocumentUser = (user: DocumentUser): PublicUser => ({
    id: user._id,
    name: user.name,
    email: user.email,
    status: user.status,
});

import { Token } from "@/types/Token";
import { connection } from "mongoose";
import { TokenSchema } from "@/db/models/schemas";

export interface TokenModel extends Token, Document {
    _id: any;
}

export const TokenModel = connection.model<TokenModel>('Token', TokenSchema);

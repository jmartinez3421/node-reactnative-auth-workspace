import {connection, Model, Document} from 'mongoose';

import {UserSchema} from './schemas';
import { PrivateUser } from "@/types/User";

export interface DocumentUser extends PrivateUser, Document{
    _id: any;
}

export const UserModel: Model<DocumentUser> = connection.model<DocumentUser>('User', UserSchema);

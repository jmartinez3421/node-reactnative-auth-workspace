import { mongo } from "mongoose";

export interface User {
    name: string;
    email: string;
    status: boolean;
}

export interface PrivateUser extends User {
    _id: mongo.ObjectId;
    password: string;
}

export interface PublicUser extends User {
    id: string;
}

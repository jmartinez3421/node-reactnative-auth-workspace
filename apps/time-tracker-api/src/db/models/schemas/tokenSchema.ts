import { Schema } from "mongoose";

export const TokenSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    token: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 3600 // 1 hour
    }
});

TokenSchema.methods.toJSON = function () {
    const { __v, ...token } = this.toObject();
    return token;
}

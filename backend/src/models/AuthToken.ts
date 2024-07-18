import { Schema } from 'mongoose';
import MongooseDelete, { SoftDeleteDocument } from 'mongoose-delete';

export interface IAuthToken extends SoftDeleteDocument {
    token: string;
    expiry: Date;
}

export const AuthTokenSchema: Schema = new Schema<IAuthToken>({
    token: { type: String, required: true },
    expiry: { type: Date, required: true }
}, {
    timestamps: true
});

AuthTokenSchema.plugin(MongooseDelete, { deletedAt: true, overrideMethods: 'all' });

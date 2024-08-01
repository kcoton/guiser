import mongoose, { Schema } from 'mongoose';
import MongooseDelete, { SoftDeleteModel, SoftDeleteDocument } from 'mongoose-delete';
import { PersonaSchema, IPersona } from './Persona';

export interface IUser extends SoftDeleteDocument {
    externalId: string;
    personas: IPersona[];
}

const UserSchema: Schema = new Schema<IUser>(
    {
        externalId: { type: String, required: true, unique: true },
        personas: [PersonaSchema],
    },
    {
        timestamps: true,
    },
);

UserSchema.plugin(MongooseDelete, { deletedAt: true, overrideMethods: 'all' });

const User: SoftDeleteModel<IUser> = mongoose.model<IUser>('User', UserSchema, 'user') as SoftDeleteModel<IUser>;

export default User;

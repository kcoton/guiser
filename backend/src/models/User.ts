import mongoose, { Document, Schema } from "mongoose";
import { PersonaSchema, IPersona } from "./Persona";

interface IUser extends Document {
    externalId: string;
    personas: IPersona[];
}

const UserSchema: Schema = new Schema<IUser>({
    externalId: { type: String, required: true, unique: true },
    personas: [PersonaSchema]
}, {
    timestamps: true
});

const User = mongoose.model<IUser>(
    'User',
    UserSchema,
    'user'
);

export default User;

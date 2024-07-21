import { Schema } from 'mongoose';
import MongooseDelete, { SoftDeleteDocument } from 'mongoose-delete';
import { ContentSchema, IContent } from './Content';
import { AuthTokenSchema, IAuthToken } from './AuthToken';

export interface IPersona extends SoftDeleteDocument {
    name: string;
    text: string;
    content: IContent[];
    authTokens: IAuthToken[];
}

export const PersonaSchema: Schema = new Schema<IPersona>({
    name: { type: String, required: true },
    text: { type: String, required: true },
    content: [ContentSchema],
    authTokens: [AuthTokenSchema]
}, {
    timestamps: true
});

PersonaSchema.plugin(MongooseDelete, { deletedAt: true, overrideMethods: 'all' });

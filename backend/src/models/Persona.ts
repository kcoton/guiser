import { Schema } from 'mongoose';
import MongooseDelete, { SoftDeleteDocument } from 'mongoose-delete';
import { ContentSchema, IContent } from './Content';

export interface IPersona extends SoftDeleteDocument {
    name: string;
    text: string;
    content: IContent[];
}

export const PersonaSchema: Schema = new Schema<IPersona>({
    name: { type: String, required: true },
    text: { type: String, required: true },
    content: [ContentSchema]
}, {
    timestamps: true
});

PersonaSchema.plugin(MongooseDelete, { deletedAt: true, overrideMethods: 'all' });

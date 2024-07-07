import mongoose, { Document, Schema } from 'mongoose';
import { ContentSchema, IContent } from './Content';

export interface IPersona extends Document {
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

const Persona = mongoose.model<IPersona>(
    'Persona', 
    PersonaSchema
);

export default Persona;

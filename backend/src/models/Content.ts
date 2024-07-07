import { Document, Schema } from 'mongoose';

export interface IContent extends Document {
    text: string;
    isRejected: boolean;
}

export const ContentSchema: Schema = new Schema<IContent>({
    text: { type: String, required: true },
    isRejected: { type: Boolean, required: true }
}, {
    timestamps: true
});

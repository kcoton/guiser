import mongoose, { Document, Schema } from 'mongoose';

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

const Content = mongoose.model<IContent>(
    'Content', 
    ContentSchema
);

export default Content;

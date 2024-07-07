import mongoose, { Document, Schema } from 'mongoose';

interface IContent extends Document {
    text: string;
    isRejected: boolean;
}

const ContentSchema: Schema = new Schema<IContent>({
    text: { type: String, required: true },
    isRejected: { type: Boolean, required: true }
}, {
    timestamps: true
});

const Content = mongoose.model<IContent>(
    'Content', 
    ContentSchema, 
    'content'
);

export default Content;

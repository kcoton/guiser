import { Schema } from 'mongoose';
import MongooseDelete, { SoftDeleteDocument } from 'mongoose-delete';

export interface IContent extends SoftDeleteDocument {
    text: string;
    isRejected: boolean;
}

export const ContentSchema: Schema = new Schema<IContent>({
    text: { type: String, required: true },
    isRejected: { type: Boolean, required: true }
}, {
    timestamps: true
});

ContentSchema.plugin(MongooseDelete, { deletedAt: true, overrideMethods: 'all' });
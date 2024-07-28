import { Schema } from 'mongoose';
import MongooseDelete, { SoftDeleteDocument } from 'mongoose-delete';

export interface IContent extends SoftDeleteDocument {
    text: string;
    isRejected: boolean;
    posted: number;
}

export const ContentSchema: Schema = new Schema<IContent>({
    text: { type: String, required: true },
    isRejected: { type: Boolean, required: true },
    posted: { type: Number, required: true, default: 0, min: 0, max: 7 }
}, {
    timestamps: true
});

ContentSchema.plugin(MongooseDelete, { deletedAt: true, overrideMethods: 'all' });

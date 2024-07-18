import { Schema } from 'mongoose';
import MongooseDelete, { SoftDeleteDocument } from 'mongoose-delete';

export interface IPost extends SoftDeleteDocument {
    platform: string;
}

export const PostSchema: Schema = new Schema<IPost>({
    platform: { type: String, required: true }
}, {
    timestamps: true
});

PostSchema.plugin(MongooseDelete, { deletedAt: true, overrideMethods: 'all' });

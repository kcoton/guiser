import { Schema } from 'mongoose';
import MongooseDelete, { SoftDeleteDocument } from 'mongoose-delete';
import { IPost, PostSchema } from './Post';

export interface IContent extends SoftDeleteDocument {
    text: string;
    isRejected: boolean;
    posts: IPost[];
}

export const ContentSchema: Schema = new Schema<IContent>({
    text: { type: String, required: true },
    isRejected: { type: Boolean, required: true },
    posts: [PostSchema]
}, {
    timestamps: true
});

ContentSchema.plugin(MongooseDelete, { deletedAt: true, overrideMethods: 'all' });

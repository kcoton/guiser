import mongoose, { Schema } from 'mongoose';
import MongooseDelete, { SoftDeleteModel, SoftDeleteDocument } from 'mongoose-delete';

const autoIncrement = require('mongoose-sequence')(mongoose);

export interface ISocialApp extends SoftDeleteDocument {
    name: string;
    maxTextLength: number;
}

const SocialAppSchema: Schema = new Schema<ISocialApp>({
    name: { type: String, required: true },
    maxTextLength: { type: Number, required: true }
}, {
    timestamps: true
});

SocialAppSchema.plugin(autoIncrement, { inc_field: 'seqNo', start_seq: 1 });
SocialAppSchema.plugin(MongooseDelete, { deletedAt: true, overrideMethods: 'all' });

const SocialApp: SoftDeleteModel<ISocialApp> = mongoose.model<ISocialApp>(
    'SocialApp', 
    SocialAppSchema, 
    'social_app'
) as SoftDeleteModel<ISocialApp>;

export default SocialApp;

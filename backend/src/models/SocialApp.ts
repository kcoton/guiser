import mongoose, { Document, Schema } from 'mongoose';

const autoIncrement = require('mongoose-sequence')(mongoose);

interface ISocialApp extends Document {
    name: string;
}

const SocialAppSchema: Schema = new Schema<ISocialApp>({
    name: { type: String, required: true }
}, {
    timestamps: true
});

SocialAppSchema.plugin(autoIncrement, { inc_field: 'seqNo', start_seq: 1 });

const SocialApp = mongoose.model<ISocialApp>(
    'SocialApp', 
    SocialAppSchema, 
    'social_app'
);

export default SocialApp;

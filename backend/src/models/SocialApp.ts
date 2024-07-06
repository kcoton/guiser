import mongoose, { Document, Schema } from 'mongoose';

interface ISocialApp extends Document {
  seq_no: number;
  name: string;
}

const SocialAppSchema: Schema = new Schema<ISocialApp>({
  seq_no: { type: Number, required: true },
  name: { type: String, required: true }
});

const SocialApp = mongoose.model<ISocialApp>('SocialApp', SocialAppSchema, 'social_app');

export default SocialApp;

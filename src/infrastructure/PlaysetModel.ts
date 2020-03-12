import { Document, Schema, model, Model } from 'mongoose';
import Category from '@src/domain/Category';

export interface PlaysetDocument extends Document {
  title: string;
  author: string;
  subtitle: string;
  description: string;
  hasThumbnail: boolean;
  viewCount: number;
  likes: string[];

  relation: Category[];
  desire: Category[];
  place: Category[];
  object: Category[];
}

const categorySchema = new Schema({
  title: { type: String, required: true },
  items: { type: [String], validate: (arr: string[]) => arr.length === 6 },
});

const pageSchema = () => ({
  type: [categorySchema],
  required: true,
  validate: (arr: Category[]) => arr.length === 6,
});

const playsetSchema = new Schema({
  _id: { type: Schema.Types.ObjectId },
  title: { type: String, required: true },
  author: { type: Schema.Types.ObjectId, required: true, ref: 'users' },
  subtitle: { type: String, default: '' },
  description: { type: String, default: '' },
  hasThumbnail: { type: Boolean, default: false },
  viewCount: { type: Number, default: 0 },
  likes: { type: [Schema.Types.ObjectId], default: [] },
  relation: pageSchema(),
  desire: pageSchema(),
  place: pageSchema(),
  object: pageSchema(),
});

(global as any).PlaysetModel =
  (global as any).PlaysetModel
  ?? model<PlaysetDocument>('playsets', playsetSchema);

export const PlaysetModel: Model<PlaysetDocument, {}> = (global as any).PlaysetModel;

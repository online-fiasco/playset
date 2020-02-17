import * as mongoose from 'mongoose';

export interface Category {
  title: string;
  items: string[];
}

export interface Playset extends mongoose.Document {
  title: string;
  relation: Category[];
  desire: Category[];
  place: Category[];
  object: Category[];
}

const categorySchema = new mongoose.Schema({
  title: { type: String, required: true },
  items: { type: [String], validate: (arr: string[]) => arr.length === 6 },
});

const playsetSchema = new mongoose.Schema({
  title: { type: String, required: true },
  relation: {
    type: [categorySchema],
    required: true,
    validate: (arr: Category[]) => arr.length === 6,
  },
  desire: {
    type: [categorySchema],
    required: true,
    validate: (arr: Category[]) => arr.length === 6,
  },
  place: {
    type: [categorySchema],
    required: true,
    validate: (arr: Category[]) => arr.length === 6,
  },
  object: {
    type: [categorySchema],
    required: true,
    validate: (arr: Category[]) => arr.length === 6,
  },
});

(global as any).PlaysetModel =
  (global as any).PlaysetModel
  ?? mongoose.model<Playset>('playsets', playsetSchema);

export const PlaysetModel: mongoose.Model<Playset, {}> = (global as any).PlaysetModel;

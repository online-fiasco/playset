import Category from '@src/domain/Category';
import { PlaysetModel, PlaysetDocument } from '@src/infrastructure/PlaysetModel';
import { connectDB } from './MongooseUtil';
import Playset from '@src/domain/Playset';

export interface PlaysetForm {
  title: string;
  author: string;
  subtitle?: string;
  description?: string;
  hasThumbnail: boolean;

  relation: Category[];
  desire: Category[];
  place: Category[];
  object: Category[];
}

const MakePlaysetDTO = (doc: PlaysetDocument, user?: string | null): Playset => {
  const { id, title, author, subtitle, description, hasThumbnail, viewCount } = doc;
  const { likes, relation, desire, place, object } = doc;

  return {
    id, title, author, subtitle, description, hasThumbnail, viewCount,
    relation, desire, place, object,
    likeCount: likes.length, liked: user ? likes.includes(user) : false,
  };
};

export const createPlayset = async (form: PlaysetForm) => {
  await connectDB();

  const playset = new PlaysetModel(form);
  const result = await playset.save();

  return MakePlaysetDTO(result);
};

export const countPlayset = async () => {
  await connectDB();

  return await PlaysetModel.countDocuments();
};

type GetPlaysetsOption = {
  pageIndex: number;
  pageSize: number;
};
export const GetPlaysets = async (query: any, user: string | null, option?: GetPlaysetsOption) => {
  await connectDB();

  const pageSize = option?.pageSize ?? 20;
  const pageIndex = option?.pageIndex ?? 1;

  const result = await PlaysetModel
    .find(query)
    .populate('author')
    .limit(pageSize)
    .skip(pageSize * (pageIndex - 1));

  return result.map(doc => MakePlaysetDTO(doc, user));
};

export const GetPlayset = async (query: any, user: string | null) => {
  await connectDB();

  const result = await PlaysetModel.findOne(query).populate('author');

  return result ? MakePlaysetDTO(result, user) : null;
};

export const UpdatePlayset = async (id: string, form: PlaysetForm) => {
  await connectDB();

  const result = await PlaysetModel.findByIdAndUpdate(id, form);

  return result ? MakePlaysetDTO(result) : null;
};

export const DeletePlayset = async (id: string) => {
  await connectDB();

  const result = await PlaysetModel.findByIdAndDelete(id);

  return result ? MakePlaysetDTO(result) : null;
};

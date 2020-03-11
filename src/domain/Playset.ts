import Category from '@src/domain/Category';

export default interface Playset {
  id: string;

  title: string;
  author: any; // User;
  subtitle: string;
  description: string;
  hasThumbnail: boolean;
  viewCount: number;
  likeCount: number;
  liked: boolean;

  relation: Category[];
  desire: Category[];
  place: Category[];
  object: Category[];
}

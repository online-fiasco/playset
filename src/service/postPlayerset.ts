import { Playset, Category } from '../model/Playset';
import { PlaysetDB } from '../db';

export const postPlaysets = async (playset: Playset) => {
  verifyPlayset(playset);

  const db = await PlaysetDB.create();

  db.create(playset);
};

export const verifyPlayset = (playset: Playset) => {
  if (!playset.title) {
    throw new TypeError('playset title is required');
  }

  const { relation, desire, place, object } = playset;
  const pages = [relation, desire, place, object];

  pages.forEach(verifyPage);
};

export const verifyPage = (page: Category[]) => {
  if (page.length !== 6) {
    throw new TypeError('page should have 6 categories');
  }

  page.forEach(verifyCategory);
};

export const verifyCategory = (category: Category) => {
  if (!category.title) {
    throw new TypeError('category title is required');
  }

  if (category.items.length !== 6) {
    throw new TypeError('category should have 6 items');
  }
};

export default postPlaysets;

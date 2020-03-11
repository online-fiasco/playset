import { PlaysetDB } from '../db';

export const getPlaysetCount = async (): Promise<number> => {
  const db = await PlaysetDB.create();

  const result = await db.count();

  return result;
};

export default getPlaysetCount;

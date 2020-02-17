import { PlaysetDB } from '../db';

export const getPlaysetCount = async (): Promise<number> => {
  const db = new PlaysetDB();

  const result = await db.count();

  return result;
};

export default getPlaysetCount;

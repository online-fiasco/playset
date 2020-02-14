import { Playset } from '../model/Playset';
import { PlaysetDB } from '../db';

export const getSinglePlayset = async (id: string): Promise<Playset | null> => {
  const db = new PlaysetDB();

  const result = await db.readOne({ _id: id });

  return result;
};

export default getSinglePlayset;

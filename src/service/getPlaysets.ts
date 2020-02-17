import { Playset } from '../model/Playset';
import { PlaysetDB } from '../db';

type GetPlaysetsQuery = {
  pageIndex?: number,
  pageSize?: number,
};

export const getPlaysets = async (query: GetPlaysetsQuery): Promise<Playset[]> => {
  const db = await PlaysetDB.create();

  const result = await db.read({ }, query);

  return result;
};

export default getPlaysets;

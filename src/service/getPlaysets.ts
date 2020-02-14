import { Playset } from '../model/Playset';
import { PlaysetDB } from '../db';

type GetPlaysetsQuery = {
  pageIndex?: number,
  pageSize?: number,
};

export const getPlaysets = async (query: GetPlaysetsQuery): Promise<Playset[]> => {
  const db = new PlaysetDB();

  const result = db.read({ }, query);

  return await result;
};

export default getPlaysets;

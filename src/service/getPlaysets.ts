import { Playset } from '../model/Playset';

type GetPlaysetsQuery = {
  pageIndex?: number,
  pageSize?: number,
};
export const getPlaysets = async (query: GetPlaysetsQuery): Promise<Playset[]> => {
};

export default getPlaysets;

import { Playset } from '../model/Playset';

type GetPlaysetsQuery = {
  pageIndex?: number,
  pageSize?: number,
};
export const getPlaysets = (query: GetPlaysetsQuery): Playset[] => {
};

export default getPlaysets;

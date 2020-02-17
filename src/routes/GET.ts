import { Context, Handler } from 'aws-lambda';
import { getPlaysets, getPlaysetCount } from '../service';
import { Playset } from '../model/Playset';

export const route: Handler = async (event: any, context: Context) => {
  const { pageIndex, pageSize } = event.queryStringParameters;
  const query = {
    pageIndex: pageIndex ? parseInt(pageIndex, 10) : undefined,
    pageSize: pageSize ? parseInt(pageSize, 10) : undefined,
  };

  let result: Playset[] = [];
  let size: number = 0;
  try {
    result = await getPlaysets(query);
    size = await getPlaysetCount();
  } catch (error) {
    return handleError(error);
  }

  const response = {
    statusCode: 200,
    headers: { 'X-Total-Count': size },
    body: JSON.stringify({ result, event }),
  };

  return response;
};

const handleError = (error: any) => {
  return {
    statusCode: 500,
    body: JSON.stringify({ error }),
  };
};

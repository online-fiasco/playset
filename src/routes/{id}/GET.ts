import { Context, Handler } from 'aws-lambda';
import { getSinglePlayset } from '../../service';
import { Playset } from '../../model/Playset';

export const route: Handler = async (event: any, context: Context) => {
  const playsetId = event.pathParameters.id as string;

  let result: Playset | null = null;
  try {
    result = await getSinglePlayset(playsetId);
  } catch (error) {
    return handleError(error);
  }

  const response = {
    statusCode: 200,
    body: JSON.stringify({ result }),
  };

  return response;
};

const handleError = (error: any) => {
  return {
    statusCode: 500,
    body: JSON.stringify({ error }),
  };
};

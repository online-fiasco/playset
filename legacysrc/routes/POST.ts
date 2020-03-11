import { Context, Handler } from 'aws-lambda';
import { postPlaysets } from '../service';

export const route: Handler = async (event: any, context: Context) => {
  const playset = JSON.parse(event.body ?? '{}');
  try {
    await postPlaysets(playset);
  } catch (error) {
    const errorResult = handleError(error);

    if (errorResult) {
      return errorResult;
    }
  }

  const response = {
    statusCode: 200,
    body: JSON.stringify({ result: 'success' }),
  };

  return response;
};

const handleError = (error: any) => {
  if (error instanceof TypeError) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: error.message }),
    };
  }

  return {
    statusCode: 500,
    body: JSON.stringify({ error }),
  };
};

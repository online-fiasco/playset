import { Handler, Context } from 'aws-lambda';

export const hello: Handler = async (event: any, context: Context) => {
  const response = {
    statusCode: 200,
    body: JSON.stringify({ result: 'Hello World!' }),
  };

  return response;
};

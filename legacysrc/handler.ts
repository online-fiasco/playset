import * as mongoose from 'mongoose';

import { Handler, Context } from 'aws-lambda';

const mongoURI = process.env.MONGO_URI as string;
mongoose.connect(mongoURI, { useNewUrlParser: true });

export const hello: Handler = async (event: any, context: Context) => {
  const response = {
    statusCode: 200,
    body: JSON.stringify({ result: 'Hello World!' }),
  };

  return response;
};

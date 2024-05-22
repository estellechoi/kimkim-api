import Cors from 'cors';
import { NextApiRequest, NextApiResponse } from 'next/types';

// Initializing the cors middleware
export const cors = Cors({
  methods: ['GET', 'HEAD', 'POST'],
  origin: (origin, callback) => {
    if (!origin || ['https://kimkim.app', 'http://localhost'].includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
});

// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
export const runMiddleware = (
  req: NextApiRequest,
  res: NextApiResponse<any>,
  fn: (req: NextApiRequest, res: NextApiResponse<any>, callback: (result: any) => any) => any,
) => {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
};

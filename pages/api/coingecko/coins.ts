import type { NextApiRequest, NextApiResponse } from 'next';
import { coingeckoAxiosClient } from '.';
import { cors, runMiddleware } from '../cors';

export interface CoinGeckoCoinApiData {
  id: string;
  name: string;
  symbol: string;
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await runMiddleware(req, res, cors);

  const response = await coingeckoAxiosClient
    .get<readonly CoinGeckoCoinApiData[]>('/coins/list', { params: req.query })
    .catch((err) => {
      return { status: err.response?.status, data: err.response?.data };
    });

  res.status(response.status ?? 500).json(response.data);
};

export default handler;

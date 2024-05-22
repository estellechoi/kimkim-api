import type { NextApiRequest, NextApiResponse } from 'next';
import { BithumbApiResponse, axiosBithumbClient } from '.';
import { cors, runMiddleware } from '../cors';

export type BithumbTransactionApiData = Readonly<{
  transaction_date: string;
  type: 'ask' | 'bid';
  units_traded: `${number}`;
  price: `${number}`;
  total: `${number}`;
}>;

const handler = async (req: NextApiRequest, res: NextApiResponse<any>) => {
  await runMiddleware(req, res, cors);

  const endpoint = `/public/transaction_history/${req.query.market}`;

  const response = await axiosBithumbClient
    .get<BithumbApiResponse<readonly [BithumbTransactionApiData]>>(endpoint, { params: { count: '100' } })
    .catch((err) => {
      return { status: err.response?.status, data: err.response?.data };
    });

  res.status(response.status ?? 500).json(response.data);
};

export default handler;

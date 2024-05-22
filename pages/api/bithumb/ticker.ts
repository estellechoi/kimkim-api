import type { NextApiRequest, NextApiResponse } from 'next';
import { BithumbApiResponse, axiosBithumbClient } from '.';
import { cors, runMiddleware } from '../cors';

export type BithumbTickerApiData = Readonly<{
  opening_price: `${number}`;
  closing_price: `${number}`;
  min_price: `${number}`;
  max_price: `${number}`;
  units_traded: `${number}`;
  acc_trade_value: `${number}`;
  prev_closing_price: `${number}`;
  units_traded_24H: `${number}`;
  acc_trade_value_24H: `${number}`;
  fluctate_24H: `${number}`;
  fluctate_rate_24H: `${number}`;
}>;

const handler = async (req: NextApiRequest, res: NextApiResponse<any>) => {
  await runMiddleware(req, res, cors);

  const endpoint = '/public/ticker/ALL_KRW';

  const response = await axiosBithumbClient
    .get<BithumbApiResponse<Readonly<{ [symbol: string]: BithumbTickerApiData }>>>(endpoint)
    .catch((err) => {
      return { status: err.response?.status, data: err.response?.data };
    });

  res.status(response.status ?? 500).json(response.data);
};

export default handler;

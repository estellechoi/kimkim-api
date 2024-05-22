import type { NextApiRequest, NextApiResponse } from 'next';
import { BithumbApiResponse, axiosBithumbClient } from '.';
import { cors, runMiddleware } from '../cors';

export type BithumbWalletApiData = Readonly<{
  currency: string;
  net_type: string;
  deposit_status: 1 | 0; // 1: 가능, 0: 불가능
  withdraw_status: 1 | 0; // 1: 가능, 0: 불가능
}>;

const handler = async (req: NextApiRequest, res: NextApiResponse<any>) => {
  await runMiddleware(req, res, cors);

  const endpoint = '/public/assetsstatus/multichain/ALL';

  const response = await axiosBithumbClient.get<BithumbApiResponse<readonly BithumbWalletApiData[]>>(endpoint).catch((err) => {
    return { status: err.response?.status, data: err.response?.data };
  });

  res.status(response.status ?? 500).json(response.data);
};

export default handler;

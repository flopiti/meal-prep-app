import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

const handleGetMethod = async (req: NextApiRequest, res: NextApiResponse) => {
  const response = await axios.get(`${process.env.BACKEND_URL}/meals/${req.query.mealId}`, {
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
    }
})
return res.status(200).json(response?.data);
};

const handler = (req: NextApiRequest, res: NextApiResponse<any[]>) => {
  switch (req.method) {
    case 'GET':
      return handleGetMethod(req, res);
    default:
      return res.status(405).end();
  }
};

export default handler;
//write the API route for scheduled meals, the GET method will return the list of scheduled meals, and the POST method will add a new scheduled meal to the list.

import axios from 'axios'
import type { NextApiRequest, NextApiResponse } from 'next'

const handleGetMethod = async (req: NextApiRequest, res: NextApiResponse) => {
    const response = await axios.get(`http://mock-api:3000/scheduled-meals`, {
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
        }
    })
    return res.status(200).json(response?.data);
}

const handlePostMethod = async (req: NextApiRequest, res: NextApiResponse) => {
    const response = await axios.post(`http://mock-api:3000/scheduled-meals`, req.body, {
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
        }
    })
    return res.status(200).json(response?.data);
}


const handler = (req: NextApiRequest, res: NextApiResponse<any[]>) => {
    switch(req.method) {
        case 'GET':
            return handleGetMethod(req, res);
        case 'POST':
            return handlePostMethod(req, res);
        default:
            return res.status(405).end()
    }
}
export default handler;
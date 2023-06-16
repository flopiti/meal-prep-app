// pages/api/gpt3.js
import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req:NextApiRequest, res:NextApiResponse) {
  if (req.method === 'POST') {
    console.log(req.body.prompt)
    const prompt = req.body.prompt;
    try {
        console.log('about to call')
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        
        {
          model: "gpt-4",
          messages: [
            {
              role: "system",
              content: prompt
            }
          ],
          max_tokens: 800,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
          },
        }
      );
      console.log(response.data.choices[0].message.content)
      res.status(200).json(response.data.choices[0].message.content);
    } catch (error) {
      res.status(500).json({ error: 'Error communicating with OpenAI API' });
    }
  } else {
    res.status(404).json({ error: 'This endpoint requires a POST request.' });
  }
}

import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { ticker } = req.query

  if (!ticker || Array.isArray(ticker)) {
    return res.status(400).json({ error: 'Invalid ticker parameter' })
  }

  try {
    const endDate = new Date().toISOString().split('T')[0]
    const startDate = new Date(Date.now() - 365 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split('T')[0]

    const response = await fetch(
      `${process.env.BASE_URL}/eod/${ticker}.US?from=${startDate}&to=${endDate}&api_token=${process.env.API_KEY}&fmt=json`,
    )

    if (!response.ok) {
      throw new Error('Failed to fetch from external API')
    }

    const data = await response.json()
    res.status(200).json(data)
  } catch (error) {
    console.error('Error fetching stock data:', error)
    res.status(500).json({ error: 'Failed to fetch stock data' })
  }
}

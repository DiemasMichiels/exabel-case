import { create } from 'zustand'

export type StockData = {
  date: string
  close: number
}

type StockStore = {
  ticker: string
  stockData: StockData[]
  error: string | null
  loading: boolean
  setTicker: (ticker: string) => void
  fetchStockData: (ticker: string) => Promise<void>
  clearError: () => void
}

export const useStockStore = create<StockStore>((set) => ({
  ticker: '',
  stockData: [],
  error: null,
  loading: false,
  setTicker: (ticker) =>
    set({ ticker: ticker.toUpperCase(), error: null, stockData: [] }),
  clearError: () => set({ error: null }),
  fetchStockData: async (ticker: string) => {
    set({ loading: true, error: null })

    try {
      const endDate = new Date().toISOString().split('T')[0]
      const startDate = new Date(Date.now() - 365 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split('T')[0]

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/eod/${ticker}.US?from=${startDate}&to=${endDate}&api_token=${process.env.NEXT_PUBLIC_API_KEY}&fmt=json`,
      )

      if (!response.ok) {
        throw new Error()
      }

      const data = await response.json()
      const formattedData = Array.isArray(data) ? data : []

      set({
        stockData: formattedData.map((item: any) => ({
          date: item.date,
          close: Number(item.close),
        })),
        loading: false,
      })
    } catch (err) {
      set({
        error:
          'Failed to fetch stock data, make sure you enter a correct US stock',
        stockData: [],
        loading: false,
      })
    }
  },
}))

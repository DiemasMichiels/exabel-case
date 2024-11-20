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
  initializeFromUrl: (ticker: string) => void
}

export const useStockStore = create<StockStore>((set) => ({
  ticker: '',
  stockData: [],
  error: null,
  loading: false,
  setTicker: (ticker) =>
    set({ ticker: ticker.toUpperCase(), error: null, stockData: [] }),
  clearError: () => set({ error: null }),
  initializeFromUrl: (ticker) => {
    if (ticker) {
      set({ ticker: ticker.toUpperCase() })
    }
  },
  fetchStockData: async (ticker: string) => {
    set({ loading: true, error: null })

    try {
      const response = await fetch(`/api/stock/${ticker}`)

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

import styles from './Search.module.scss'
import clsx from 'clsx'
import { useStockStore } from '@store/useStockStore'
import type { FormEvent } from 'react'

const Search = () => {
  const { ticker, loading, setTicker, fetchStockData, clearError } =
    useStockStore()

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()

    if (ticker) {
      clearError()
      fetchStockData(ticker)
    }
  }

  return (
    <form className='box' onSubmit={handleSubmit}>
      <h1 className='header center'>US Stock Price Viewer</h1>
      <div className={styles.inputContainer}>
        <input
          className={clsx('input', styles.searchInput)}
          type='text'
          placeholder='Enter a US stock symbol (e.g., AAPL, MSFT)...'
          value={ticker}
          onChange={(e) => setTicker(e.target.value)}
        />
        <input
          type='submit'
          value='Search'
          className='button'
          disabled={loading || !ticker}
        />
      </div>
    </form>
  )
}

export default Search

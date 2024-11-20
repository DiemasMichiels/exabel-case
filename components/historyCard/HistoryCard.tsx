import styles from './HistoryCard.module.scss'
import clsx from 'clsx'
import { useStockStore } from '@store/useStockStore'
import Spinner from '@components/spinner/Spinner'

const HistoryCard = () => {
  const { ticker, stockData, loading, error } = useStockStore()

  if (!error && !loading && !stockData.length) {
    return null
  }

  return (
    <div className='box'>
      <h2 className='header center'>Price History for {ticker}</h2>
      {loading && (
        <div className={styles.loading}>
          <Spinner />
        </div>
      )}
      {!loading && error && <p className={styles.error}>{error}</p>}
    </div>
  )
}

export default HistoryCard

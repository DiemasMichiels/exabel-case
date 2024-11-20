import { useState } from 'react'
import styles from './Search.module.scss'
import clsx from 'clsx'

const Search = () => {
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <form
      className={clsx('box', styles.form)}
      onSubmit={(event) => {
        event?.preventDefault()
        alert(searchQuery)
      }}
    >
      <h1 className='header'>US Stock Price Viewer</h1>
      <div className={styles.inputContainer}>
        <input
          className={clsx('input', styles.searchInput)}
          type='text'
          placeholder='Enter a US stock symbol (e.g., AAPL, MSFT)...'
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <input type='submit' value='Search' className='button' />
      </div>
    </form>
  )
}

export default Search

import HistoryCard from '@components/historyCard/HistoryCard'
import Page from '@components/page/Page'
import Search from '@components/search/Search'
import type { NextPage } from 'next'

const Index: NextPage = () => {
  return (
    <Page>
      <Search />
      <HistoryCard />
    </Page>
  )
}

export default Index

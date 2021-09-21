import { useHistory } from 'react-router-dom'
import { useAuth } from '../Context/AuthContext'

const NoSearchResults = () => {
  const { getSokaRequestQuery } = useAuth()
  const history = useHistory()

  const handleBrowseAll = async () => {
    await getSokaRequestQuery()
    history.push('/search-results')
  }

  return (
    <div>
      <h1>No Results were found</h1>
      <button onClick={handleBrowseAll}>Browse All</button>
    </div>
  )
}

export default NoSearchResults

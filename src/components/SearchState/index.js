/* eslint-disable react/no-unknown-property */
import {Link} from 'react-router-dom'
import {BiChevronRightSquare} from 'react-icons/bi'
import './index.css'

const SearchState = props => {
  const {searchDetails, stateCode, stateName} = props
  const {id} = searchDetails

  const onClickState = () => {
    stateCode(id)
  }

  return (
    <li className="searchStateLI">
      <Link to={`/state/${stateCode}`} className="searchStateLI">
        <p className="searchStateP">{stateName}</p>
        <button type="button" onClick={onClickState} className="searchStateBtn">
          {stateCode} <BiChevronRightSquare />
        </button>
      </Link>
    </li>
  )
}

export default SearchState

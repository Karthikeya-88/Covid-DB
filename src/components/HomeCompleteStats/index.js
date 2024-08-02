/* eslint-disable react/no-unknown-property */
import {Link} from 'react-router-dom'

import './index.css'

const HomeCompleteStats = props => {
  const {details} = props
  const {
    stateName,
    confirmed,
    recovered,
    deceased,
    population,
    stateCode,
  } = details
  const active = confirmed - recovered - deceased

  return (
    <li className="homeList">
      <Link to={`/state/${stateCode}`} className="stateName stateNameLink">
        <p className="stateName">{stateName}</p>
      </Link>
      <p className="statsConfirm namesFont">{confirmed}</p>
      <p className="statsActive namesFont">{active}</p>
      <p className="statsRecover namesFont">{recovered}</p>
      <p className="statsDead namesFont">{deceased}</p>
      <p className="statsPop namesFont">{population}</p>
    </li>
  )
}

export default HomeCompleteStats

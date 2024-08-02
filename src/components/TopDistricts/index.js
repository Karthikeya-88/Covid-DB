import './index.css'

const TopDistricts = props => {
  const {topDistrictsNumber, topDistrictsName} = props

  return (
    <li className="topDistrictslist">
      <p className="topDistrictsNum">{topDistrictsNumber}</p>
      <p className="topDistrictsName">{topDistrictsName}</p>
    </li>
  )
}

export default TopDistricts

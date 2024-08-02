import {Link} from 'react-router-dom'
import './index.css'

const NotFound = () => (
  <div className="notFoundDiv">
    <img
      src="https://res.cloudinary.com/dnmyyqfhs/image/upload/v1718650964/Group_7484_tbsq3k.png"
      alt="not-found-pic"
    />
    <h1 className="notFoundH">PAGE NOT FOUND</h1>
    <p className="notFoundP">
      we are sorry, the page you requested could not be found
    </p>
    <Link to="/">
      <button type="button" className="notFoundBtn">
        Home
      </button>
    </Link>
  </div>
)

export default NotFound

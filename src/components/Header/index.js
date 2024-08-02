import {useState} from 'react'
import {Link, withRouter} from 'react-router-dom'
import './index.css'

const Header = () => {
  const [smallNavbar, setNavbar] = useState(false)

  const handleSmallNavbar = () => {
    setNavbar(true)
  }

  const closeMenu = () => {
    setNavbar(false)
  }

  return (
    <nav className="headerNav">
      <div className="headerImg">
        <Link to="/">
          <span className="covidNameheader">
            COVID19<span className="covidNameSpan">INDIA</span>
          </span>
        </Link>
        <ul className="headerHomeAbout">
          <li>
            <Link to="/" className="navLink">
              Home
            </Link>
          </li>
          <li>
            <Link to="/about" className="navLink">
              About
            </Link>
          </li>
        </ul>
      </div>
      <div>
        <div className="smallDevices">
          <Link to="/">
            <h1 className="covidNameheader">
              COVID19<span className="covidNameSpan">INDIA</span>
            </h1>
          </Link>
          <button
            type="button"
            onClick={handleSmallNavbar}
            className="menuButton"
          >
            <img
              src="https://res.cloudinary.com/dnmyyqfhs/image/upload/v1719242136/add-to-queue_1_1_wiawby.png"
              alt="menu-button"
            />
          </button>
        </div>
        {smallNavbar ? (
          <>
            <ul className="smallDevices smallUl">
              <li>
                <Link to="/" className="navLink">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="navLink">
                  About
                </Link>
              </li>
              <li>
                <button onClick={closeMenu} type="button" className="closeMenu">
                  <img
                    src="https://res.cloudinary.com/dnmyyqfhs/image/upload/v1719242460/Solid_iotdji.png"
                    alt="close icon"
                  />
                </button>
              </li>
            </ul>
          </>
        ) : null}
      </div>
    </nav>
  )
}

export default withRouter(Header)

import {VscGithubAlt} from 'react-icons/vsc'
import {FiInstagram} from 'react-icons/fi'
import {FaTwitter} from 'react-icons/fa'
import './index.css'

const Footer = () => (
  <div className="footerDiv">
    <span className="covidNameheader">
      COVID19<span className="covidNameSpan">INDIA</span>
    </span>
    <p className="footerDes">
      we stand with everyone fighting on the front lines
    </p>
    <div className="footerIconDiv">
      <VscGithubAlt className="gitIcon" />
      <FiInstagram className="instaIcon" />
      <FaTwitter className="twitterIcon" />
    </div>
  </div>
)

export default Footer

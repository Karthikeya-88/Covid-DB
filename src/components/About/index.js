/* eslint-disable react/no-unknown-property */
import {Component} from 'react'
import Loader from 'react-loader-spinner'

import Header from '../Header'
import Footer from '../Footer'
import Faqs from '../Faqs'

import './index.css'

class About extends Component {
  state = {faqData: [], isLoading: true}

  componentDidMount() {
    this.getFaqs()
  }

  getFaqs = async () => {
    const url = 'https://apis.ccbp.in/covid19-faqs'
    const options = {
      method: 'GET',
    }
    const response = await fetch(url, options)

    const data = await response.json()
    console.log(data)

    this.setState({faqData: data.faq, isLoading: false})
  }

  renderAbout = () => {
    const {faqData} = this.state

    return (
      <div>
        <p className="aboutAb">About</p>
        <p className="lastUpdate">Last update on march 28th 2021.</p>
        <p className="covid19Head">
          COVID-19 vaccines be ready for distribution
        </p>
        <ul testid="faqsUnorderedList" className="aboutUl">
          {faqData.map(each => (
            <Faqs key={each.qno} faqDetails={each} />
          ))}
        </ul>
      </div>
    )
  }

  render() {
    const {isLoading} = this.state
    return (
      <>
        <Header />
        <div className="aboutBg">
          {isLoading ? (
            <div testid="aboutRouteLoader" className="loaderBg">
              <Loader type="Oval" color="#007bff" height="50" weight="50" />
            </div>
          ) : (
            <>{this.renderAbout()}</>
          )}
        </div>
        <Footer />
      </>
    )
  }
}

export default About

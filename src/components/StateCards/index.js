/* eslint-disable react/no-unknown-property */
import {Component} from 'react'

import './index.css'

class StateCards extends Component {
  state = {
    confirmedCard: {},
    recoveredCard: {},
    activeCard: {},
    deceasedCard: {},
  }

  componentDidMount() {
    this.getStateCardData()
  }

  getStateCardData = async () => {
    const {totalStateCards} = this.props
    const districtConfirmed = totalStateCards.confirmed
    const districtRecovered = totalStateCards.recovered
    const districtDeceased = totalStateCards.deceased
    const districtActive =
      districtConfirmed - districtRecovered - districtDeceased

    const confirmedCard = {
      name: 'Confirmed',
      logo:
        'https://res.cloudinary.com/dnmyyqfhs/image/upload/v1719842504/Group_orki1o.png',
      value: districtConfirmed,
    }

    const activeCard = {
      name: 'Active',
      logo:
        'https://res.cloudinary.com/dnmyyqfhs/image/upload/v1719842617/protection_1_elt1fb.png',
      value: districtActive,
    }

    const recoveredCard = {
      name: 'Recovered',
      logo:
        'https://res.cloudinary.com/dnmyyqfhs/image/upload/v1719842660/recovered_1_klti6z.png',
      value: districtRecovered,
    }

    const deceasedCard = {
      name: 'Deceased',
      logo:
        'https://res.cloudinary.com/dnmyyqfhs/image/upload/v1719842684/breathing_1_pu2duw.png',
      value: districtDeceased,
    }

    this.setState({
      confirmedCard,
      activeCard,
      recoveredCard,
      deceasedCard,
    })
  }

  cardClick = value => {
    const {stateListCards} = this.props
    stateListCards(value)
  }

  render() {
    const {confirmedCard, activeCard, recoveredCard, deceasedCard} = this.state
    const {isStateCard} = this.props

    const isDistrictCard = isStateCard ? 'background-color' : ''
    return (
      <>
        <ul className="stateSpecificNumbers">
          <li
            className={`stateCardBackground ${confirmedCard.name} ${isDistrictCard}`}
            tabIndex="-1"
            key={confirmedCard.name}
            value={confirmedCard.name}
            onClick={() => this.cardClick(confirmedCard.name)}
          >
            <div
              testid="stateSpecificConfirmedCasesContainer"
              className="numbers confirmedDiv"
            >
              <p className="confirmedHead">{confirmedCard.name}</p>
              <img
                src={confirmedCard.logo}
                alt="state specific confirmed cases pic"
                className="numberImages"
              />
              <p className="confirmedHeadnumbers">{confirmedCard.value}</p>
            </div>
          </li>
          <li
            className={`stateCardBackground ${activeCard.name}`}
            tabIndex="-1"
            key={activeCard.name}
            value={activeCard.name}
            onClick={() => this.cardClick(activeCard.name)}
          >
            <div
              testid="stateSpecificActiveCasesContainer"
              className="numbers activeDiv"
            >
              <p className="confirmedHead">{activeCard.name}</p>
              <img
                src={activeCard.logo}
                alt="state specific active cases pic"
                className="numberImages"
              />
              <p className="confirmedHeadnumbers">{activeCard.value}</p>
            </div>
          </li>
          <li
            className={`stateCardBackground ${recoveredCard.name}`}
            tabIndex="-1"
            key={recoveredCard.name}
            value={recoveredCard.name}
            onClick={() => this.cardClick(recoveredCard.name)}
          >
            <div
              testid="stateSpecificRecoveredCasesContainer"
              className="numbers recoveredDiv"
            >
              <p className="confirmedHead">{recoveredCard.name}</p>
              <img
                src={recoveredCard.logo}
                alt="state specific recovered cases pic"
                className="numberImages"
              />
              <p className="confirmedHeadnumbers">{recoveredCard.value}</p>
            </div>
          </li>
          <li
            className={`stateCardBackground ${deceasedCard.name}`}
            tabIndex="-1"
            key={deceasedCard.name}
            value={deceasedCard.name}
            onClick={() => this.cardClick(deceasedCard.name)}
          >
            <div
              testid="stateSpecificDeceasedCasesContainer"
              className="numbers deceasedDiv"
            >
              <p className="confirmedHead">{deceasedCard.name}</p>
              <img
                src={deceasedCard.logo}
                alt="state specific deceased cases pic"
                className="numberImages"
              />
              <p className="confirmedHeadnumbers">{deceasedCard.value}</p>
            </div>
          </li>
        </ul>
      </>
    )
  }
}

export default StateCards

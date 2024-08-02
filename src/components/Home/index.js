/* eslint-disable react/no-unknown-property */
import {Component} from 'react'
import Loader from 'react-loader-spinner'

import {BsSearch} from 'react-icons/bs'
import {FcGenericSortingAsc, FcGenericSortingDesc} from 'react-icons/fc'
import Header from '../Header'
import Footer from '../Footer'
import SearchState from '../SearchState'
import HomeCompleteStats from '../HomeCompleteStats'

import './index.css'

const statesList = [
  {
    state_code: 'AN',
    state_name: 'Andaman and Nicobar Islands',
  },
  {
    state_code: 'AP',
    state_name: 'Andhra Pradesh',
  },
  {
    state_code: 'AR',
    state_name: 'Arunachal Pradesh',
  },
  {
    state_code: 'AS',
    state_name: 'Assam',
  },
  {
    state_code: 'BR',
    state_name: 'Bihar',
  },
  {
    state_code: 'CH',
    state_name: 'Chandigarh',
  },
  {
    state_code: 'CT',
    state_name: 'Chhattisgarh',
  },
  {
    state_code: 'DN',
    state_name: 'Dadra and Nagar Haveli and Daman and Diu',
  },
  {
    state_code: 'DL',
    state_name: 'Delhi',
  },
  {
    state_code: 'GA',
    state_name: 'Goa',
  },
  {
    state_code: 'GJ',
    state_name: 'Gujarat',
  },
  {
    state_code: 'HR',
    state_name: 'Haryana',
  },
  {
    state_code: 'HP',
    state_name: 'Himachal Pradesh',
  },
  {
    state_code: 'JK',
    state_name: 'Jammu and Kashmir',
  },
  {
    state_code: 'JH',
    state_name: 'Jharkhand',
  },
  {
    state_code: 'KA',
    state_name: 'Karnataka',
  },
  {
    state_code: 'KL',
    state_name: 'Kerala',
  },
  {
    state_code: 'LA',
    state_name: 'Ladakh',
  },
  {
    state_code: 'LD',
    state_name: 'Lakshadweep',
  },
  {
    state_code: 'MH',
    state_name: 'Maharashtra',
  },
  {
    state_code: 'MP',
    state_name: 'Madhya Pradesh',
  },
  {
    state_code: 'MN',
    state_name: 'Manipur',
  },
  {
    state_code: 'ML',
    state_name: 'Meghalaya',
  },
  {
    state_code: 'MZ',
    state_name: 'Mizoram',
  },
  {
    state_code: 'NL',
    state_name: 'Nagaland',
  },
  {
    state_code: 'OR',
    state_name: 'Odisha',
  },
  {
    state_code: 'PY',
    state_name: 'Puducherry',
  },
  {
    state_code: 'PB',
    state_name: 'Punjab',
  },
  {
    state_code: 'RJ',
    state_name: 'Rajasthan',
  },
  {
    state_code: 'SK',
    state_name: 'Sikkim',
  },
  {
    state_code: 'TN',
    state_name: 'Tamil Nadu',
  },
  {
    state_code: 'TG',
    state_name: 'Telangana',
  },
  {
    state_code: 'TR',
    state_name: 'Tripura',
  },
  {
    state_code: 'UP',
    state_name: 'Uttar Pradesh',
  },
  {
    state_code: 'UT',
    state_name: 'Uttarakhand',
  },
  {
    state_code: 'WB',
    state_name: 'West Bengal',
  },
]

class Home extends Component {
  state = {
    searchInput: '',
    homeContent: [],
    stateSearchList: [],
    totalActiveCases: 0,
    totalDeadCases: 0,
    totalRecoveredCases: 0,
    totalConfirmedCases: 0,
    isLoading: true,
  }

  componentDidMount() {
    this.getHomeApi()
  }

  getHomeApi = async () => {
    const url = 'https://apis.ccbp.in/covid19-state-wise-data'
    const options = {method: 'GET'}
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      console.log(data)
      let confirmedCases = 0
      let recoveredCases = 0
      let activeCases = 0
      let deceasedCases = 0

      statesList.forEach(stateCode => {
        if (data[stateCode.state_code]) {
          const {total} = data[stateCode.state_code]
          confirmedCases += total.confirmed ? total.confirmed : 0
          deceasedCases += total.deceased ? total.deceased : 0
          recoveredCases += total.recovered ? total.recovered : 0
        }
      })
      activeCases += confirmedCases - (recoveredCases + deceasedCases)

      const states = statesList.map(each => ({
        stateName: each.state_name,
        stateCode: each.state_code,
        confirmed: Object.keys(data)
          .filter(state => state === each.state_code)
          .map(e => data[e].total.confirmed),
        recovered: Object.keys(data)
          .filter(state => state === each.state_code)
          .map(e => data[e].total.recovered),
        deceased: Object.keys(data)
          .filter(state => state === each.state_code)
          .map(e => data[e].total.deceased),
        population: Object.keys(data)
          .filter(state => state === each.state_code)
          .map(e => data[e].meta.population),
      }))

      this.setState({
        totalActiveCases: activeCases,
        totalRecoveredCases: recoveredCases,
        totalConfirmedCases: confirmedCases,
        totalDeadCases: deceasedCases,
        isLoading: false,
        homeContent: states,
      })
    }
  }

  renderTotalNumbers = () => {
    const {
      totalActiveCases,
      totalConfirmedCases,
      totalDeadCases,
      totalRecoveredCases,
    } = this.state
    return (
      <>
        <div className="homeNumbers">
          <div
            className="numbers confirmedDiv"
            testid="countryWideConfirmedCases"
          >
            <p className="confirmedHead">Confirmed</p>
            <img
              src="https://res.cloudinary.com/dnmyyqfhs/image/upload/v1718548017/vntsa4umcpluuc8vgfbp.png"
              alt="country wide confirmed cases pic"
              className="numberImages"
            />
            <p className="confirmedHeadnumbers">{totalConfirmedCases}</p>
          </div>
          <div className="numbers activeDiv" testid="countryWideActiveCases">
            <p className="confirmedHead">Active</p>
            <img
              src="https://res.cloudinary.com/dnmyyqfhs/image/upload/v1718550614/protection_1_i2dtmu.png"
              alt="country wide active cases pic"
              className="numberImages"
            />
            <p className="confirmedHeadnumbers">{totalActiveCases}</p>
          </div>
          <div
            className="numbers recoveredDiv"
            testid="countryWideRecoveredCases"
          >
            <p className="confirmedHead">Recovered</p>
            <img
              src="https://res.cloudinary.com/dnmyyqfhs/image/upload/v1718550663/recovered_1_jgslwt.png"
              alt="country wide recovered cases pic"
              className="numberImages"
            />
            <p className="confirmedHeadnumbers">{totalRecoveredCases}</p>
          </div>
          <div
            className="numbers deceasedDiv"
            testid="countryWideDeceasedCases"
          >
            <p className="confirmedHead">Deceased</p>
            <img
              src="https://res.cloudinary.com/dnmyyqfhs/image/upload/v1718550700/breathing_1_evgaao.png"
              alt="country wide deceased cases pic"
              className="numberImages"
            />
            <p className="confirmedHeadnumbers">{totalDeadCases}</p>
          </div>
        </div>
      </>
    )
  }

  ascendingSortClick = () => {
    const {homeContent} = this.state
    const sort = homeContent.sort((sortA, sortB) => {
      const a = sortA.stateName.toUpperCase()
      const b = sortB.stateName.toUpperCase()
      return a > b ? 1 : -1
    })
    this.setState({homeContent: sort})
  }

  descendingSortClick = () => {
    const {homeContent} = this.state
    const sort = homeContent.sort((sortA, sortB) => {
      const a = sortA.stateName.toUpperCase()
      const b = sortB.stateName.toUpperCase()
      return a < b ? 1 : -1
    })
    this.setState({homeContent: sort})
  }

  searchInputList = e => {
    const search = e.target.value
    const searchList = statesList.filter(each =>
      each.state_name.toLowerCase().includes(search.toLowerCase()),
    )
    return this.setState({
      searchInput: e.target.value,
      stateSearchList: searchList,
    })
  }

  renderStatesData = () => {
    const {homeContent} = this.state
    return (
      <div className="allStatesTable" testid="stateWiseCovidDataTable">
        <div className="tableHead">
          <div className="stateNameHeadDiv">
            <p className="stateNameHead">States/UT</p>
            {/* eslint-disable-next-line */}
            <button
              type="button"
              className="ascdescBtn"
              onClick={this.ascendingSortClick}
              testid="ascendingSort"
            >
              <FcGenericSortingAsc className="homeOrderIcon" />
            </button>
            {/* eslint-disable-next-line */}
            <button
              type="button"
              className="ascdescBtn"
              onClick={this.descendingSortClick}
              testid="descendingSort"
            >
              <FcGenericSortingDesc className="homeOrderIcon" />
            </button>
          </div>
          <p className="remainingHeadins">Confirmed</p>
          <p className="remainingHeadins">Active</p>
          <p className="remainingHeadins">Recovered</p>
          <p className="remainingHeadins">Deceased</p>
          <p className="remainingHeadins">Population</p>
        </div>
        <hr className="homeHLC" />
        <ul className="homeUlList">
          {homeContent.map(each => (
            <HomeCompleteStats key={each.stateCode} details={each} />
          ))}
        </ul>
      </div>
    )
  }

  listOfSearch = () => {
    const {stateSearchList} = this.state
    return (
      <ul testid="searchResultsUnorderedList" className="searchStateUL">
        {stateSearchList.map(each => (
          <SearchState
            stateName={each.state_name}
            stateCode={each.state_code}
            id={each.state_code}
            key={each.state_code}
            searchDetails={each}
          />
        ))}
      </ul>
    )
  }

  loadingFalse = () => {
    this.setState({isLoading: false})
  }

  searchInputClear = () => {
    this.setState({stateSearchList: []})
  }

  render() {
    const {searchInput, isLoading, stateSearchList} = this.state
    const searchResult = stateSearchList.length === 0 ? '' : this.listOfSearch()

    return (
      <>
        <Header />
        <>
          {isLoading ? (
            <div testid="homeRouteLoader" className="loaderBg">
              <Loader type="Oval" color="#007bff" height="50" weight="50" />
            </div>
          ) : (
            <>
              <div className="ultimateHomeBg">
                <div className="homeInputCont">
                  {this.loadingFalse}
                  <BsSearch className="searchIcon" testid="searchIcon" />
                  <input
                    type="search"
                    onChange={this.searchInputList}
                    onAbort={this.searchInputClear}
                    placeholder="Enter the State"
                    className="inputEl"
                  />
                </div>
                {searchInput.length > 0 ? searchResult : ''}
                {this.renderTotalNumbers()}
                {this.renderStatesData()}
              </div>
            </>
          )}
        </>
        <Footer />
      </>
    )
  }
}

export default Home

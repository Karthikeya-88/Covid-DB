/* eslint-disable react/no-unknown-property */
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import Footer from '../Footer'
import StateCards from '../StateCards'
import TopDistricts from '../TopDistricts'
import Charts from '../Charts'

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

class SpecificState extends Component {
  state = {
    isLoading: true,
    totalState: [],
    totalTested: 0,
    stateCode: '',
    stateDate: '',
    id: '',
    isStateCard: true,
    category: 'Confirmed',
    listStateName: '',
    localStoreData: [],
  }

  componentDidMount() {
    this.getDistrictData()
  }

  getDistrictData = async () => {
    const url = 'https://apis.ccbp.in/covid19-state-wise-data/'
    const options = {method: 'GET'}

    const {match} = this.props
    const {params} = match
    const {stateCode} = params

    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      const stateTested = data[stateCode].total.tested
      const isStateCode = statesList.filter(
        each => each.state_code === stateCode,
      )

      const totalStateData = data[stateCode].total
      const stateName = isStateCode[0].state_name
      const newDate = new Date(data[stateCode].meta.last_updated)

      this.setState({
        isLoading: false,
        totalState: totalStateData,
        listStateName: stateName,
        stateDate: newDate,
        localStoreData: data,
        id: stateCode,
        stateCode,
        totalTested: stateTested,
      })
    } else {
      console.log('Error')
    }
  }

  stateData = () => {
    const {id, localStoreData, category} = this.state
    const listOfDistricts = localStoreData[id].districts
    const listOfDistrictsName = Object.keys(listOfDistricts)
    const lowerCase = category.toLowerCase()

    const dataElement = listOfDistrictsName.map(each => ({
      districtNameList: each,
      districtValue: listOfDistricts[each].total[lowerCase]
        ? listOfDistricts[each].total[lowerCase]
        : 0,
    }))
    dataElement.sort((a, b) => b.districtValue - a.districtValue)

    const stateActiveCase = listOfDistrictsName.map(each => ({
      districtNameList: each,
      districtValue:
        listOfDistricts[each].total.confirmed -
        (listOfDistricts[each].total.recovered +
          listOfDistricts[each].total.deceased)
          ? listOfDistricts[each].total.confirmed -
            (listOfDistricts[each].total.recovered +
              listOfDistricts[each].total.deceased)
          : 0,
    }))
    stateActiveCase.sort((a, b) => b.districtValue - a.districtValue)

    if (lowerCase === 'active') {
      return stateActiveCase
    }
    return dataElement
  }

  stateListCards = card => {
    this.setState({category: card, isStateCard: false})
  }

  districtName = () => {
    const {
      listStateName,
      totalTested,
      totalState,
      isStateCard,
      stateCode,
      category,
      stateDate,
    } = this.state
    const topDistricts = this.stateData()

    const months = [
      'Jan',
      'Feb',
      'March',
      'April',
      'May',
      'June',
      'July',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ]

    return (
      <div>
        <div>
          <div className="nameTested">
            <h1 className="specificStateNameHead">{listStateName}</h1>
            <div className="testedNumDiv">
              <p className="testedHead">Tested</p>
              <p className="testedNum">{totalTested}</p>
            </div>
          </div>
          <p className="lastUpdatedDes">{`Last update on ${
            months[stateDate.getMonth()]
          } ${stateDate.getDate()} ${stateDate.getFullYear()}.`}</p>
        </div>
        <div>
          <StateCards
            stateListCards={this.stateListCards}
            totalStateCards={totalState}
            isStateCard={isStateCard}
          />
        </div>
        <div className="topDistrictsDiv">
          <h1 className={`topDistrictsHeading stateRoute${category}`}>
            Top Districts
          </h1>
          <div>
            <ul testid="topDistrictsUnorderedList" className="topDistrictsUL">
              {topDistricts.map(each => (
                <TopDistricts
                  key={each.districtNameList}
                  topDistrictsNumber={each.districtValue}
                  topDistrictsName={each.districtNameList}
                />
              ))}
            </ul>
          </div>
        </div>
        <div testid="lineChartsContainer" className="specificChartsContainer">
          <Charts districtsChart={category} districtCode={stateCode} />
        </div>
      </div>
    )
  }

  render() {
    const {isLoading} = this.state
    return (
      <>
        <Header />
        <div className="ultimateSpecificState">
          {isLoading ? (
            <div className="loaderBg" testid="stateDetailsLoader">
              <Loader type="Oval" color="#007bff" height="50" weight="50" />
            </div>
          ) : (
            this.districtName()
          )}
          <Footer />
        </div>
      </>
    )
  }
}

export default SpecificState

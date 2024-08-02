/* eslint-disable react/no-unknown-property */
import {Component} from 'react'
import Loader from 'react-loader-spinner'

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Legend,
  Tooltip,
  LineChart,
  Line,
} from 'recharts'

import './index.css'

class Charts extends Component {
  state = {
    chartsList: '',
    remainingCharts: '',
    isLoading: true,
  }

  componentDidMount() {
    this.getChartData()
  }

  getChartData = async () => {
    const url = 'https://apis.ccbp.in/covid19-timelines-data/'
    const options = {method: 'GET'}
    const {districtCode} = this.props

    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()

      const dataObject = Object.keys(data[districtCode].dates)
      const dataState = dataObject.map(each => ({
        each,
        confirmed: data[districtCode].dates[each].total.confirmed,
        recovered: data[districtCode].dates[each].total.recovered,
        deceased: data[districtCode].dates[each].total.deceased,
        tested: data[districtCode].dates[each].total.tested,
        active:
          data[districtCode].dates[each].total.confirmed -
          (data[districtCode].dates[each].total.deceased +
            data[districtCode].dates[each].total.recovered),
      }))

      const dataCharts = dataObject.map(each => ({
        each,
        confirmed: data[districtCode].dates[each].total.confirmed,
        recovered: data[districtCode].dates[each].total.recovered,
        deceased: data[districtCode].dates[each].total.deceased,
        tested: data[districtCode].dates[each].total.tested,
        active:
          data[districtCode].dates[each].total.confirmed -
          (data[districtCode].dates[each].total.deceased +
            data[districtCode].dates[each].total.recovered),
      }))

      this.setState({
        chartsList: dataState,
        remainingCharts: dataCharts,
        isLoading: false,
      })
    }
  }

  graphList = (caseList, color) => {
    const {remainingCharts} = this.state
    return (
      <div>
        <LineChart
          width={1000}
          height={240}
          data={remainingCharts}
          margin={{top: 5, right: 50, left: 20, bottom: 5}}
        >
          <XAxis
            dataKey="each"
            style={{
              fontFamily: 'Roboto',
              fontWeight: 500,
              textTransform: 'uppercase',
            }}
            dy={5}
          />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey={caseList} stroke={color} />
        </LineChart>
      </div>
    )
  }

  graphCharts = () => (
    <div className="graphChartsDiv">
      <h1 className="dailySpreadHead">Daily Spread Trends</h1>
      <div testid="lineChartsContainer" className="indGraphsDiv">
        <div className="indGraphs">
          {this.graphList('confirmed', '#ff073a')}
        </div>
        <div className="indGraphs">{this.graphList('active', '#007bff')}</div>
        <div className="indGraphs">
          {this.graphList('recovered', '#27a243')}
        </div>
        <div className="indGraphs">{this.graphList('deceased', '#6c7570')}</div>
        <div className="indGraphs">{this.graphList('tested', '#9673b9')}</div>
      </div>
    </div>
  )

  render() {
    const {chartsList, isLoading} = this.state
    const {districtsChart} = this.props
    const barChart = districtsChart.toLowerCase()
    const maxBarChart = chartsList.slice(Math.max(chartsList.length - 10, 0))

    let barColor = '#9a0e31'
    if (barChart === 'confirmed') {
      barColor = '#9a0e31'
    } else if (barChart === 'active') {
      barColor = '#007bff'
    } else if (barChart === 'recovered') {
      barColor = '#27a243'
    } else if (barChart === 'deceased') {
      barColor = '#6c7570'
    }

    return (
      <>
        {isLoading ? (
          <div testid="timelinesDataLoader" className="loaderBg">
            <Loader type="Oval" width={50} height={50} color="#007bff" />
          </div>
        ) : (
          <div className="remainingChartsDiv">
            <div>
              <BarChart
                width={700}
                height={240}
                barSize={35}
                data={maxBarChart}
                margin={{top: 5, right: 30, left: 20, bottom: 5}}
              >
                <XAxis
                  dataKey="each"
                  stroke={`${barColor}`}
                  interval={0}
                  axisLine={false}
                  fontSize={10}
                  tickLine={0}
                  strokeWidth={1}
                  style={{
                    fontFamily: 'Roboto',
                    fontWeight: 500,
                    textTransform: 'uppercase',
                  }}
                  dy={10}
                />
                <Tooltip />
                <Legend />
                <Bar
                  dataKey={barChart}
                  fill={`${barColor}`}
                  label={{position: 'top', fill: `${barColor}`, fontSize: 10}}
                  radius={[8, 8, 0, 0]}
                />
              </BarChart>
            </div>
            <div>{this.graphCharts()}</div>
          </div>
        )}
      </>
    )
  }
}

export default Charts

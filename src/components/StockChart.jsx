import Chart from 'react-apexcharts'
import { useState } from 'react'
export const StockChart = ({ chartData, symbol }) => {
  const determineTimeFormat = () => {
    switch (dateFormat) {
      case "24h":
        return day
      case "7D":
        return week
      case "1Y":
        return year
      default:
        return day
    }
  }
  const [dateFormat, setDateFormat] = useState("24h")
  const { day, week, year } = chartData;
  // const color = determineTimeFormat()[determineTimeFormat().length - 1].y - determineTimeFormat()[0].y > 0 ? "#26C281" : "ed3419"

  const options = {
    // colors: [color],
    title: {
      text: symbol,
      align: "center",
      style: {
        fontSize: "24px"
      }
    },
    chart: {
      id: "stock data",
      animations: {
        speed: 1300
      }
    },
    xaxis: {
      type: "datetime",
      labels: {
        datetimeUTC: false
      }
    },
    tooltip: {
      x: {
        format: "MMM dd HH:MM"
      }
    }
  }

  const series = [{
    name: symbol,
    data: determineTimeFormat()
  }]

  const renderButtonSelect = (button) => {
    const classes = "btn m-1 "
    if (button === dateFormat) {
      return classes + "btn-primary"
    } else {
      return classes + "btn-outline-primary"
    }
  }
  return (
    <div style={{ backgroundColor: "rgba(145, 158, 171, 0.04)" }} className="mt-5 p-4 shadow-sm bg-white">
      <Chart options={options} series={series} type="area" width="100%" />
      <div>
        <button type="button" onClick={() => setDateFormat("24h")} className={renderButtonSelect("24h")} >24h</button>
        <button type="button" onClick={() => setDateFormat("7D")} className={renderButtonSelect("7D")} >7D</button>
        <button type="button" onClick={() => setDateFormat("1Y")} className={renderButtonSelect("1Y")} >1Y</button>
      </div>



    </div>
  )
}
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import finnHub from "../apis/finnHub"
import { StockChart } from "../components/StockChart"

export const StockDetailPage = () => {
  const { symbol } = useParams()
  const [chartData, setChartData] = useState([]);

  const formatData = ({ data }) => {
    return data.t.map((el, index) => {
      return {
        x: el * 1000,
        y: Math.floor(data.c[index])
      }
    })
  }

  useEffect(() => {
    const fetchData = async () => {
      const date = new Date()
      const currentTime = Math.floor(date.getTime() / 1000)
      let oneDay = currentTime - 3 * 24 * 60 * 60
      if (date.getDay() === 6) {
        oneDay = currentTime - 2 * 24 * 60 * 60
      }
      else if (date.getDay() === 0) {
        oneDay = currentTime - 3 * 24 * 60 * 60
      } else {
        oneDay = currentTime - 24 * 60 * 60
      }
      const oneWeek = currentTime - 7 * 24 * 60 * 60
      const oneYear = currentTime - 365 * 24 * 60 * 60

      const responses = await Promise.all([
        await finnHub.get("/stock/candle", {
          params: {
            symbol,
            from: oneDay,
            to: currentTime,
            resolution: 30
          }
        }),
        await finnHub.get("/stock/candle", {
          params: {
            symbol,
            from: oneWeek,
            to: currentTime,
            resolution: 60
          }
        }),
        await finnHub.get("/stock/candle", {
          params: {
            symbol,
            from: oneYear,
            to: currentTime,
            resolution: "W"
          }
        })
      ])
      console.log(responses)

      setChartData({
        day: formatData(responses[0]),
        week: formatData(responses[1]),
        year: formatData(responses[2])
      })
    }
    fetchData();
  }, [symbol])

  return (
    <div>
      {chartData && (<div>
        <StockChart chartData={chartData} symbol={symbol} />
      </div>)}
    </div>
  )
}
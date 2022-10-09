import { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import finnHub from "../apis/finnHub";
import { BsFillCaretDownFill } from 'react-icons/bs';
import { BsFillCaretUpFill } from 'react-icons/bs';
import { WatchListContext } from '../context/watchListContext'


export const StockList = () => {
  // const [watchList, setWatchList] = useState(['GOOGL', 'MSFT', 'AMZN']);

  const { watchList } = useContext(WatchListContext);
  const navigate = useNavigate();
  // console.log(value)
  const [stock, setStock] = useState([])
  const changeColor = (change) => {
    return change > 0 ? "success" : "danger";
  }

  const handleIcon = (change) => {
    return change > 0 ? <BsFillCaretUpFill /> : <BsFillCaretDownFill />;
  }

  useEffect(() => {
    let isMounted = true
    const fetchData = async () => {
      try {
        const response = await Promise.all(watchList.map((currentStock) => {
          return finnHub.get("/quote", {
            params: {
              symbol: currentStock
            }
          })
        }))
        console.log(response);

        const data = response.map((res) => {
          return {
            data: res.data,
            symbol: res.config.params.symbol
          }
        })
        console.log(data);

        if (isMounted) {
          setStock(data)
        }
      } catch (err) {

      }
    }
    fetchData();

    return () => { isMounted = false }
  }, [watchList])
  
  const handleStockSelect = (symbol) => {
    navigate(`detail/${symbol}`)
  }
  return (
    <div>
      <table className="table hover mt-5">
        <thead className={{ color: "rgb(79, 89, 102)" }}>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Last</th>
            <th scope="col">Chg</th>
            <th scope="col">Chg%</th>
            <th scope="col">High</th>
            <th scope="col">Low</th>
            <th scope="col">Open</th>
            <th scope="col">Close</th>
          </tr>
        </thead>
        <tbody>
          {
            stock.map((stockData) => {
              return (
                <tr style={{ cursor: "pointer" }} className='table-row' key={stockData.symbol} onClick={() => handleStockSelect(stockData.symbol)}>
                  <th scope="row">{stockData.symbol}</th>
                  <td>{stockData.data.c}</td>
                  <td className={`text-${changeColor(stockData.data.d)}`}>{stockData.data.d} {handleIcon(stockData.data.d)}</td>
                  <td className={`text-${changeColor(stockData.data.dp)}`}>{stockData.data.dp} {handleIcon(stockData.data.dp)}</td>
                  <td >{stockData.data.h}</td>
                  <td>{stockData.data.l}</td>
                  <td>{stockData.data.o}</td>
                  <td>{stockData.data.pc}</td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
    </div>
  )
}
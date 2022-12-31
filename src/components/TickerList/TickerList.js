import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import './TickerList.css'
import Ticker from '../Ticker/Ticker'
import TickerNew from '../TickerNew/TickerNew'
import SearchPopup from '../SearchPopup/SearchPopup';

 

function TickerList(props){

    const dispatch = useDispatch();
    
    // const [tickers, setTickers] = useState(['AAPL', 'GOOGL', 'OXY','GLNG']); 
    // const [tickers, setTickers] = useState([]); 

    const tickersFromStore = useSelector((state) => {
        const ids = state.tickers.map(ticker => ticker.id);
        // console.log('tickers from store');
        // console.log(ids);
        return ids;
    })



    const addTicker = (name) => {
        // setTickers([...tickers, name ])
        // console.log('added ' + name + ' to ' + tickers)
        dispatch({type: 'ADD', id: name, 
                               startPrice: 0, 
                               price: 0, 
                               defaultPercent: 0, 
                               amount: 1, 
                               currency: 'usd'})
    }

    const removeTicker = (name) => {
        dispatch({
            type: 'REMOVE',
            id: name
        })
      }
    
    return(
            <table className='TickerList'>

                <thead className='header'>
                    <tr>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Curr</th>
                        <th>Change</th>
                        <th id = 'amount'>Amount</th>
                        <th>Total</th>
                        <th style={{paddingRight: 0}}></th>
                    </tr>
                </thead>
                <tbody>
                    {/* render tickers */}
                    {tickersFromStore?.map((ticker) => <TickerNew key={ticker} name={ticker} removeTicker={removeTicker}/>)} 
                        
                    <tr>
                        <td id='addButtonRow' colSpan="7">
                            {/* ADD BUTTON */}
                            <SearchPopup addTicker={addTicker}></SearchPopup>
                        </td>
                    </tr>

                    {/* <tr style={{height: "100%"}}>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr> */}

                </tbody>
            </table>
        )          
}
export default TickerList;  
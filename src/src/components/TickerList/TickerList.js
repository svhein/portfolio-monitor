import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import './TickerList.css'
import Ticker from '../Ticker/Ticker'
import SearchPopup from '../SearchPopup/SearchPopup';

 

function TickerList(props){

   
    useEffect(() => {
        let tickers1 = useSelector((state) => state.tickers)
        console.log('lol')
        
    },[])

    const dispatch = useDispatch();
    
    const [tickers, setTickers] = useState(['AAPL', 'GOOGL', 'OXY','GLNG']); 
    // const [tickers, setTickers] = useState(tickers1); 

    const addTicker = (name) => {
        setTickers([...tickers, name ])
        console.log('added ' + name + ' to ' + tickers)
    }

    const removeTicker = (name) => {
        console.log('removing ' + name)
        const newtickers = tickers.filter(ticker => ticker !== name)
        dispatch({
            type: 'REMOVE',
            id: name
        })
        setTickers(newtickers)
    }
    
    return(
        <table className='TickerList'>

            <thead className='header'>
                <tr>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Curr</th>
                    <th>Change</th>
                    <th>Amount</th>
                    <th>Total</th>
                </tr>
            </thead>
            <tbody>
                {/* render tickers */}
                {tickers?.map((ticker) => <Ticker key={ticker} name={ticker} removeTicker={removeTicker}/>)}
                    
                <tr>
                    <td colSpan="7">
                        {/* ADD BUTTON */}
                        <SearchPopup addTicker={addTicker}></SearchPopup>
                    </td>
                </tr>

                <tr style={{height: "100%"}}>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>

            </tbody>
        </table>
        )          
}
export default TickerList;  
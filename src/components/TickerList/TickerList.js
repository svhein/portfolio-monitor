import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import './TickerList.css'
import Ticker from '../Ticker/Ticker'
import SearchPopup from '../SearchPopup/SearchPopup';
import { UpdateDatabase } from '../../utils/updateDatabase';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';

function TickerList(props){

    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(true);
    
    const tickersFromStore = useSelector((state) => {
        const ids = state.tickers.map(ticker => ticker.id);
        return ids;
    })

    useEffect(() => {
        setIsLoading(false)
    }, [])


    const addTicker = (name) => {
        dispatch({type: 'ADD', id: name, 
                               startPrice: 0, 
                               price: 0, 
                               defaultPercent: 0, 
                               amount: 1, 
                               currency: 'usd'})
    }

    const removeTicker = (name) => {
        console.log(tickersFromStore.length)
        if (tickersFromStore.length > 1 ){
            dispatch({
                type: 'REMOVE',
                id: name
            })
            UpdateDatabase();
        }
       
        
      }
    
    return(
        <div className = 'tableContainer'>
            <table className='TickerList'>
                <thead className='tickerListHeader'>
                    <tr>
                        <th id='sticky_column' style={{zIndex: 10, background: "rgb(8, 3, 77)", paddingLeft:"10px"}}>Name</th>
                        <th>Price</th>
                        {window.innerWidth > 600 ? <th>Curr</th> : null}
                        <th>Change</th>
                        <th id = 'amount'>Amount</th>
                        <th>Total</th>
                        <th style={{paddingRight: 0}}></th>
                    </tr>
                </thead>
                <tbody>
                    {/* render tickers */}
                    {/* {tickersFromStore?.map((ticker) => <Ticker type='tableItem' key={ticker} name={ticker} removeTicker={removeTicker}/>)}  */}
                    {tickersFromStore.length > 0 ? tickersFromStore?.map((ticker) => <Ticker type='tableItem' key={ticker} name={ticker} removeTicker={removeTicker}/>) 
                        : <LoadingSpinner></LoadingSpinner>}
                        
                    <tr>
                        <td id='addButtonRow' colSpan="7">
                            {/* ADD BUTTON */}
                            <SearchPopup addTicker={addTicker}></SearchPopup>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        )          
}
export default TickerList;  
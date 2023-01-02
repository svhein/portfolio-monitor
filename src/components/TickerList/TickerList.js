import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import './TickerList.css'
import Ticker from '../Ticker/Ticker'
import SearchPopup from '../SearchPopup/SearchPopup';
import { UpdateDatabase } from '../../utils/updateDatabase';

 

function TickerList(props){

    const dispatch = useDispatch();
    
    const tickersFromStore = useSelector((state) => {
        const ids = state.tickers.map(ticker => ticker.id);
        return ids;
    })


    const addTicker = (name) => {
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
        UpdateDatabase();
        
      }
    
    return(
            <table className='TickerList'>

                <thead className='tickerListHeader'>
                    <tr>
                        <th>Name</th>
                        <th>Price</th>
                        {window.innerWidth > 500 ? <th>Curr</th> : null}
                        <th>Change</th>
                        <th id = 'amount'>Amount</th>
                        <th>Total</th>
                        <th style={{paddingRight: 0}}></th>
                    </tr>
                </thead>
                <tbody>
                    {/* render tickers */}
                    {tickersFromStore?.map((ticker) => <Ticker type='tableItem' key={ticker} name={ticker} removeTicker={removeTicker}/>)} 
                        
                    <tr>
                        <td id='addButtonRow' colSpan="7">
                            {/* ADD BUTTON */}
                            <SearchPopup addTicker={addTicker}></SearchPopup>
                        </td>
                    </tr>
                </tbody>
            </table>
        )          
}
export default TickerList;  
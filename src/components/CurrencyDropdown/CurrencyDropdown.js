import React, {useState} from 'react';
import './CurrencyDropdown.css'
import {useDispatch} from 'react-redux';
import { UpdateDatabase } from '../../utils/updateDatabase';

function CurrencyDropdown(props){

    const [currency, setCurrency] = useState(props.currency)
    const dispatchUpdatedCurrency = useDispatch();

    function handleChange(e){
        setCurrency(e.target.value);
        dispatchUpdatedCurrency({
            type: 'SET_CURRENCY',
            id: props.ticker,
            updatedCurrency: e.target.value
        })
        UpdateDatabase();

    }

    return (
        <div>
            <select value={props.currency} ticker={props.ticker} onChange={handleChange} className='dropdown'>
                <option value='usd'>USD</option>
                <option value='EUR'>EUR</option>
            </select>
        </div>
       
    )
}


export default CurrencyDropdown;
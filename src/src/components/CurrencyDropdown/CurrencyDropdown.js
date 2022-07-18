import React, {useState} from 'react';
import './CurrencyDropdown.css'
import {useDispatch} from 'react-redux';

function CurrencyDropdown(props){

    const [currency, setCurrency] = useState('USD')
    const dispatchUpdatedCurrency = useDispatch();

    function handleChange(e){
        setCurrency(e.target.value);
        dispatchUpdatedCurrency({
            type: 'SET_CURRENCY',
            id: props.ticker,
            updatedCurrency: e.target.value
        })
    }

    return (
        <div>
            <select ticker={props.ticker} onChange={handleChange} className='dropdown'>
                <option value='USD'>USD</option>
                <option value='EUR'>EUR</option>
            </select>
        </div>
       
    )
}


export default CurrencyDropdown;
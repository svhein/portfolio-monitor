import React, {useState, useEffect} from 'react';
import { useSelector, connect } from 'react-redux'


import './Totalvalue.css'

function Totalvalue(props){

    const [textColor, setTextColor] = useState('white')
    const [latestValue, setLatestValue] = useState(0);

    const tickers = useSelector(state => state.tickers)
    let totalValue = 0;

    const reducer = (prev, next) => prev + next.price * next.amount;
    totalValue = tickers.reduce(reducer, 0); 
    
    useEffect(() => {
        setTextColor(chooseColor());
        setTimeout(() => {setTextColor('white')}, 225);
        setLatestValue(totalValue);
    },[tickers])

    function chooseColor(){
        if (totalValue > latestValue + 0.01){
            return 'green'
        }
        if (totalValue < latestValue - 0.01){
            return 'red'
        }
        else{
            return 'white'
        }
    }

    //totalValue = tickers.reduce((sum, next) => sum + next.price * next.amount, 0)
    
    return <h1 className='price' style={{color: textColor}}> {(totalValue.toFixed(2)).toLocaleString('fi-FI')} </h1>
}

export default Totalvalue;
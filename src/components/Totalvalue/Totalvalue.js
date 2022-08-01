import React, {useState, useEffect, useMemo} from 'react';
import { useSelector } from 'react-redux'

import './Totalvalue.css'

export function Totalvalue(props){

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
    // return totalValue.toFixed(2);
}


export function GetTotalValue(){

    const storeData = useSelector(store => store.tickers)    
    const totalValue = useMemo(() => {
        const reducer = (prev, next) => prev + next.price * next.amount;
        let value = storeData.reduce(reducer, 0); 
    }, [storeData] )

    return totalValue;
}
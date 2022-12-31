import React, {useState, useEffect} from 'react';
import './ChangeToday.css';
import {useSelector} from 'react-redux';
import { GetTotalValue } from '../Totalvalue/Totalvalue';

export function PriceChangeToday(currencyArg = 'usd'){

    const [dailyChange, setDailyChange] = useState(0);
    const storeData = useSelector(state => state.tickers);


    useEffect(() => {
        let totalChange = 0;

        storeData.forEach((ticker) => {
            const openingPrice = ticker.price / (1 + ticker.changePercent/100);
            const valueNow = ticker.price;
            totalChange += (valueNow - openingPrice) * ticker.amount;
        })

        setDailyChange(totalChange.toFixed(2));

    }, [storeData])

    return (dailyChange)
}

export function PortfolioOpeningPrice(){
    const storeData = useSelector(state => state.tickers);
    let total = 0;
    storeData.forEach((ticker ) => {
        const openingPrice = ticker.price / (1 + ticker.changePercent/100);
        total += openingPrice * ticker.amount;
    } )
}

export function ChangePercentToday(){

    const [changePercent, setChangePercent] = useState(0)    
    const [color, setColor] = useState('white')
    const [latestValue, setLatestValue] = useState(0);
    
    let totalValue = parseFloat(GetTotalValue()).toFixed(2);
    let changePriceToday = parseFloat(PriceChangeToday()).toFixed(2);

    let openingPrice = totalValue - changePriceToday;

    useEffect(() => {
        setChangePercent(((totalValue / openingPrice) -1) * 100)
        setColor(blinkColor())
        setTimeout(setColor(priceColor()), 30)
        setLatestValue(changePercent)
    },[totalValue])

    const priceColor = () => {
        if (changePercent == 0){return 'white'}
        else if (changePercent > 0){return 'green'}
        else if (changePercent < 0){return 'red'}
    }
    
    function blinkColor(){
        if (changePercent > latestValue + 0.01){
            return 'green'
        }
        if (changePercent < latestValue - 0.01){
            return 'red'
        }
        else{
            return 'white'
        }
    }


    return (<td style={{color: color}}>{changePercent.toFixed(2)} %</td>);
}




// export default ChangePercentToday;
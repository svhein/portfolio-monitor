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
    
    let totalValue = GetTotalValue();
    let changePriceToday = PriceChangeToday();

    let openingPrice = parseFloat(totalValue) - parseFloat(changePriceToday);

    let changePercent = totalValue / openingPrice;

    return parseFloat(changePercent);
}


// export default ChangePercentToday;
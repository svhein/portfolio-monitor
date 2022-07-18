import React, {useState, useEffect} from 'react';
import './ChangeToday.css';
import {useSelector} from 'react-redux';

function ChangeToday(props){
    
    const [dailyChange, setDailyChange] = useState(0);
    const storeData = useSelector(state => state.stocks);

    useEffect(() => {
        let totalChange = 0;

        storeData.forEach((stock) => {
            const openingPrice = stock.price / (1 + stock.changePercent/100);
            const valueNow = stock.price;
            totalChange += (valueNow - openingPrice) * stock.amount;
        })

        setDailyChange(totalChange.toFixed(2));

    }, [storeData])

    return (<h1>Change Today: {dailyChange}</h1>)
}

export default ChangeToday;
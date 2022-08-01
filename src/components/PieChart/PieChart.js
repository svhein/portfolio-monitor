import React, {useState} from 'react';
import { useSelector } from 'react-redux';
import { Chart } from 'react-google-charts';

function PieChart(props){

    const storeData = useSelector(store => {
        const data = [['Ticker', 'Total']];
        store.tickers.forEach(ticker => {
            const name = ticker.id;
            const price = parseFloat(ticker.price);
            const amount = parseFloat(ticker.amount);
            const total = (price * amount).toFixed(2)
            data.push([name, parseFloat(total)])
        })
        return data;
    })

    const data = [
        ["Task", "Hours per Day"],
        ["Work", 11],
        ["Eat", 2],
        ["Commute", 2],
        ["Watch TV", 2],
        ["Sleep", 7],
      ];

    const options = {
        legend: 'none',
        backgroundColor: "rgb(1, 0, 17)",
        width: 300,
        height: 300,
        chartArea: {left: 0,top: 0,width:"100%",height:"100%"}
    }

    return(
        <Chart
            chartType="PieChart"
            data={storeData}
            options={options}
    
         />
    )
}

export default PieChart;

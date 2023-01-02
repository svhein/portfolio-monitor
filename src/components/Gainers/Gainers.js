import React, {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux';
import './Gainers.css'

function TopGainersPercent(props){
    
    const tickers = useSelector((state) => state.tickers)
    tickers.sort((a,b) => b.changePercent - a.changePercent )
    const topTree = tickers.slice(0,3);

    function DataRows(){
        let rows = [
            <thead className = 'gainersHeader'>
                <tr>
                    <th>TOP-3 GAINERS %</th>
                    <th></th>
                </tr>
            </thead>
        ];
        topTree.map(ticker => {
            let color = ticker.changePercent > 0 ? 'green' : ticker.changePercent == 0 ? 'white' : 'red';
            rows.push(
                <tr>
                    <td>
                        {ticker.id}
                    </td>
                    <td style={{color: color}}>
                        {ticker.changePercent}
                    </td>
                </tr>
            )
        })
        return rows;
    }

    return (
        <table className = 'gainersTable'>
            <DataRows />
        </table>
    )
}

function BottomGainersPercent(props){
    const tickers = useSelector((state) => state.tickers)
    tickers.sort((a,b) => a.changePercent - b.changePercent)
    const topTree = tickers.slice(0,3);

    function DataRows(){
        let rows = [
            <thead className = 'gainersHeader'>
                <tr>
                    <th>BOTTOM-3 GAINERS %</th>
                    <th></th>
                </tr>
            </thead>
        ];
        topTree.map(ticker => {
            let color = ticker.changePercent > 0 ? 'green' : ticker.changePercent == 0 ? 'white' : 'red';
            rows.push(
                <tr>
                    <td>
                        {ticker.id}
                    </td>
                    <td style={{color: color}}>
                        {ticker.changePercent}
                    </td>
                </tr>
            )
        })
        return rows;
    }

    return (
        <table className = 'gainersTable'>
            <DataRows />
        </table>
    )
    
}

function TopGainersPortfolio(props){
    const tickers = useSelector((state) => state.tickers)
    tickers.sort((a,b) => (b.changePercent * b.price * b.amount) - (a.changePercent * a.price * a.amount))
    const topTree = tickers.slice(0,3);

    function DataRows(){
        let rows = [
            <thead className = 'gainersHeader'>
                <tr>
                    <th>TOP-3 MOVERS</th>
                    <th></th>
                </tr>
            </thead>
        ];
        topTree.map(ticker => {
            let change = (ticker.price * ticker.amount * ticker.changePercent/100).toFixed(2)
            rows.push(
                <tr>
                    <td>{ticker.id}</td>
                    {/* <td>{(ticker.price * ticker.amount * ticker.changePercent/100).toFixed(2)}</td> */}
                    {change > 0 ? <td style={{color:'green'}}>+{change}€</td> : <td style={{color: 'red'}}>{change}</td>}
                </tr>
            )
        })
    return rows;
    }
    return (
        <table className = 'moversTable'>
            <DataRows />
        </table>
    )

}

function BottomGainersPortfolio(props){
    const tickers = useSelector((state) => state.tickers)
    tickers.sort((a,b) => (a.changePercent * a.price * a.amount) - (b.changePercent * b.price * b.amount) )
    const topTree = tickers.slice(0,3);

    function DataRows(){
        let rows = [
            <thead className = 'gainersHeader'>
                <tr>
                    <th>BOTTOM-3 MOVERS</th>
                    <th></th>
                </tr>
            </thead>
        ];
        topTree.map(ticker => {
            let change = (ticker.price * ticker.amount * ticker.changePercent/100).toFixed(2)
            rows.push(
                <tr>
                    <td>{ticker.id}</td>
                    {/* <td>{(ticker.price * ticker.amount * ticker.changePercent/100).toFixed(2)}</td> */}
                    {change > 0 ? <td style={{color:'green'}}>+{change}€</td> : <td style={{color: 'red'}}>{change}€</td>} 
                </tr>
            )
        })
    return rows;
    }
    return (
        <table className = 'moversTable'>
            <DataRows />
        </table>
    )

}

export {TopGainersPercent};
export {BottomGainersPercent};
export {TopGainersPortfolio};
export {BottomGainersPortfolio};
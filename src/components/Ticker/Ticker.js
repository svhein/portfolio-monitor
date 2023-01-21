import React, { useState, useEffect } from 'react'
import './Ticker.css'
import {useDispatch, useSelector} from 'react-redux';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import CurrencyDropdown from '../CurrencyDropdown/CurrencyDropdown';
import YahooWebSocket from '../../utils/YahooWebSocket';
import proto from '../../utils/YPricingData.proto';
import axios from 'axios';
import { UpdateDatabase } from '../../utils/updateDatabase';
const protobuf = require("protobufjs");
const { Buffer } = require('buffer/');

function TickerNew(props){

    const [price, setPrice] = useState(null)
    const [amount, setAmount] = useState(1);
    const [currency, setCurrency]  = useState('usd');
    const [changePercent, setChangePercent] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [percentColor, setPercentColor] = useState('white');
    const [priceColor, setPriceColor] = useState('white');
    const [oldPrice, setOldPrice] = useState(0)

    const tickerId = props.name

    // get ticker from store
   
    const ticker = useSelector(state => {
        const tick = state.tickers.find(ticker => ticker.id == props.name)
        return tick;
    });

    const storeTickers = useSelector(state => state.tickers)
    const dispatch = useDispatch()


    useEffect(() => {
        if (props.type == 'tableItem'){
            setPrice(ticker.price);
            setAmount(ticker.amount);
            setCurrency(ticker.currency);
            setChangePercent(ticker.changePercent)
        }
    }, [ticker])

    useEffect(() => {
        UpdateDatabase()
    }, [currency])

    useEffect(() => {
        console.log(props.type)
        axios.get(`https://portfolioserver-rqvj6ywtea-lz.a.run.app/${props.name}`).then((result) => {
            setPrice(result.data[0])
            setChangePercent(parseFloat(result.data[1]).toFixed(2))
            console.log('changePercent set to ' + changePercent)
        })
        .catch(e => console.log('Fetching price failed: ', e))
    }, [])


    // connect to websocket
    useEffect(() => {
        protobuf.load(proto, (error, root) => {
            console.log('protobuf load')
            if (error){
                console.log(error)
            }
            const yahooMessage = root.lookupType("yahooMessage");
            const socket = new WebSocket('wss://streamer.finance.yahoo.com');
    
            socket.onopen = () =>  {
                socket.send(JSON.stringify({
                    subscribe: [props.name]       //TODO
                }));
                console.log("subscribed " + props.name)
            }
        
            socket.onmessage = (message) => {
                // console.log('got message to ' + props.name)
                let messageData = (yahooMessage.decode(new Buffer(message.data, 'base64')));
                let messagePrice = Number(messageData.price).toFixed(4);
                let messagePercent = Number(messageData.changePercent).toFixed(2);
                let marketHours = messageData.marketHours
                let priceDifference = messagePrice - oldPrice;
                flashColor(priceDifference);
                setOldPrice(messagePrice);
                setPrice(messagePrice);
                setChangePercent((messageData.changePercent).toFixed(2));
                
                dispatch({ type: 'UPDATE',
                            id: props.name,
                            price: messagePrice,
                            changePercent: messagePercent
                            })
            }
        })
    }, [])


    useEffect(() => {
        changePercent > 0 ? setPercentColor('green') : setPercentColor('red');
    }, [changePercent])

    // blink when price changes
    function flashColor(priceDifference){
        if (Math.abs(priceDifference )> 0.00005 ){
            let color = priceDifference >= 0 ? "green" : "red"; 
            // console.log(priceDifference + ' diff ' + color)
            setPriceColor(color)
            setTimeout(() => {
                setPriceColor("white")
        }, 333)
        }
    }
    
    function handleAmountChange(e){ 
        const value = e.target.value;
        setAmount(Number(value));
        dispatch({type: 'SET_AMOUNT', tickerId: props.name, newAmount: Number(value)})
        console.log('set new amount to ' + Number(value))
        UpdateDatabase();
    }


    if (props.type == 'tableItem'){
        return(
            <tr>
                {/* NAME */}
                <td id='sticky_column'>    {props.name}   </td>
    
                {/* PRICE */}
                <td style={{color: priceColor}}> {price} </td>
    
                {/* CURRENCY */}
                {window.innerWidth > 500 ? <td>    <CurrencyDropdown ticker={props.name} currency={currency} />   </td> : null}
    
                {/* CHANGEPERCENT */}
                <td style={{color: percentColor}}> {changePercent} % </td>
    
                {/* AMOUNT */}
                {/* <td id='amount' contenteditable="true" onKeyUp={handleAmountChange}>
                        {amount}
                        
                </td>      */}

                <td id='amount'>
                    <input id='amount' onChange={handleAmountChange} value={amount}></input>
                </td>
    
                {/* TOTAL VALUE   */}
                <td> 
                    {/* {( amount * price).toFixed(2) }  */}
                    {Intl.NumberFormat('fi-FI', { style: 'currency', currency: currency}).format(price*amount) } 
                </td>
                
                {/* REMOVE BUTTON */}
                <td>
                    <button onClick={() => props.removeTicker(tickerId)} className='remove_button'>
                        <>&times;</>  
                    </button>
                </td>
            </tr>
            );
    }

    if (props.type == 'marqueeItem'){
        let color = changePercent > 0 ? 'green' : changePercent == 0 ? 'white' : 'red';
        return(
            <div className = 'marqueeItem'>
                <p>{props.name}</p>
                {/* <p>{' '}{price}</p> */}
                <p style={{color: color}}>{' '}{changePercent}%{'    '}</p>
            </div>
        )
    }
    
}

export default TickerNew;
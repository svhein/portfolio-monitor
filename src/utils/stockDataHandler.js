
import React, {useState, useEffect} from 'react';
import proto from '../YPricingData.proto';
const protobuf = require("protobufjs");
const { Buffer } = require('buffer/');
// const WebSocket = require('isomorphic-ws')
//const WebSocket = require('ws');


function Yaticker(props){
    console.log('test');
    /* const [stocks, setStocks] = useState([
        {
            id: 'nokia', // fake data
            price: 5,
            changePercent: '1%'
        },
        {
            id: 'aapl', // fake data
            price: 250,
            changePercent: '3.2%'
        }
    ]); */

    const [stock, setStock] = useState(null);

    useEffect(() => {

        const root = protobuf.load(proto, (error, root) =>{
            console.log('testi')
            console.log(proto)
            if(error){
                console.log('virhe'  + error);
            }

            const Yaticker = root.lookupType("yaticker");
            const ws = new WebSocket('wss://streamer.finance.yahoo.com');
            console.log('lol')

            ws.onopen = function open() {
                console.log('connected');
                console.log(props.name);
                ws.send(JSON.stringify({
                    // subscribe: ['BTC-USD', 'ETH-USD']       //TODO
                    subscribe: ['BTC-USD']
                }));
            };

            ws.onclose = function close() {
                console.log('disconnected');
            };

            ws.onmessage = function incoming(data) {
                console.log('comming message')
                //console.log(data.data);
                const messageData = (Yaticker.decode(new Buffer(data.data, 'base64')));
                console.log(messageData);
                setStock(messageData);
                
            };
        })

    }, []);


    return(
        // stock && <p>{stock.price}</p>
        <p>{stock ? stock.price : 'fetching'}</p>
    )
}

export default Yaticker;

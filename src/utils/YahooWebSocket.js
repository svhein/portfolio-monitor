import React, { useEffect, useRef } from 'react';

import proto from './YPricingData.proto';
const protobuf = require("protobufjs");
const { Buffer } = require('buffer/');

function YahooWebSocket(props){

    console.log('lol')

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
                    subscribe: [props.ticker]       //TODO
                }));
                console.log(`Send ${props.ticker} request`)
            }
    
            socket.onmessage = (message) => {
                console.log('message incoming');
                let messageData = (yahooMessage.decode(new Buffer(message.data, 'base64')));
                console.log(messageData); 
            }
    
        })
    }, [])

    return null;

}

export default YahooWebSocket;

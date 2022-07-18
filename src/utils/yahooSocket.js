import proto from './YPricingData.proto';
const protobuf = require("protobufjs");
const { Buffer } = require('buffer/');

let stockData = null;

function setupSocket(ticker){
    const root = protobuf.load(proto, (error, root) =>{
        //console.log('testi')
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
                subscribe: [ticker]
            }));
        };
    
        ws.onclose = function close() {
            console.log('disconnected');
        };
    
        ws.onmessage = function incoming(data) {
            console.log('comming message')
            console.log(data.data);
            stockData = (Yaticker.decode(new Buffer(data.data, 'base64')));
            //setStock(messageData);
            
        };
    });

}



function getPrice(){
    return stockData.price;
}
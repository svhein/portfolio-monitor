import React, { useState, useEffect} from 'react';
import './Ticker.css';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import CurrencyDropdown from '../CurrencyDropdown/CurrencyDropdown';

// import Yaticker from '../../utils/stockDataHandler'
import proto from '../../utils/YPricingData.proto';
import {connect}  from 'react-redux'
import protobuf from 'protobufjs'
import axios from 'axios';
import {Buffer} from 'buffer';
import { Oval } from  'react-loader-spinner'



class Ticker extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            ticker: null,
            amount: 1,
            color: "white",
            currency: 'USD'
        }
        this.setAmount = this.setAmount.bind(this);    
    }
    
    UNSAFE_componentWillMount(){
        // fetch share price from server
        console.log('getting price')
        axios.get(`http://localhost:8000/${this.props.name}`)
            .then(result => {this.props.dispatch({type: 'ADD', payload: this.props, id: this.props.name, startPrice: result.data, price: result.data, defaultPercent: 0, amount: 1, currency: this.state.currency})
                            this.setState({ticker: {...this.state.ticker, price: result.data, changePercent: 0}})})
    }

    componentDidMount(){  

        // ADD TO STATE
        //this.props.dispatch({type: 'ADD', payload: this.props})

        // CONNECT TO YAHOO WEB SOCKET
        const root  = protobuf.load(proto, (error, root) =>{
            console.log('testi')
            console.log(proto)
            if(error){
                console.log(error);
            }
            const Yaticker = root.lookupType("yaticker");
            const ws = new WebSocket('wss://streamer.finance.yahoo.com');
            
            ws.onopen = function open() {
                console.log('connected to ' + this.props.name);
                //console.log(props.name);
                ws.send(JSON.stringify({
                    subscribe: [this.props.name]       //TODO
                }));
                console.log('subscribed ' + this.props.name);
            }.bind(this);

            ws.onclose = function close() {
                console.log('disconnected');
                console.log('reconnecting...')
                setTimeout(function() {
                    ws.onopen();
                  }, 1000);
            };

            ws.onmessage = function incoming(data) {
                console.log('comming message')
                let messageData = (Yaticker.decode(new Buffer(data.data, 'base64')));
                messageData = {...messageData, amount: parseFloat(this.state.amount)};
                console.log(messageData);
                const textColor = messageData.changePercent > 0 ? "green" : "red";
                this.setState({
                    ticker: messageData,
                    color: textColor
                })
                this.props.dispatch({type: 'UPDATE', payload: messageData});     
            }.bind(this);
        })
    }

    setAmount(e){
        const value = e.target.textContent
        console.log('set amount change: ' + value);
        this.setState({amount: value})
        this.props.dispatch({type: 'SET_AMOUNT', id: this.props.name, newAmount: value })
    }


    componentDidUpdate(){
        // if(this.state.color === "white"){       
        // }
        // if(this.state.color === "green"){
        //     this.setState({ color: "0, 227, 0"})
        //     setTimeout(() => {this.setState({ color: "green"})}, 50);
        // }

    }

    render(){
        let tickersList = this.props.tickersList;

        const loadingSpinner = <Oval
            height="15"
            width="15"
            color='white'
            ariaLabel='loading'
         />
      
        return(
            <tr>
                <td>{this.props.name}</td>
                <td style={{color: this.state.color}}>
                     {this.state.ticker ? parseFloat(this.state.ticker.price).toFixed(2) : loadingSpinner}
                </td>
                <td> <CurrencyDropdown ticker={this.props.name} /> </td>
                <td style={{color: this.state.color}}>
                     {this.state.ticker ? this.state.ticker.changePercent.toFixed(2) + " %" : loadingSpinner} 
                </td>
                <td id='amount' contenteditable="true" onKeyUp={this.setAmount}>
                     {this.state.amount}
                </td>        
                <td> 
                    {this.state.ticker ? (this.state.amount * parseFloat(this.state.ticker.price)).toFixed(2) : 0} 
                </td>
                <td>
                    <button onClick={() => this.props.removeTicker(this.props.name)} className='remove_button'>
                        <>&times;</>  
                    </button>
                </td>
            </tr>
        );
    }  
}

function mapStateToProps(state){
    return {
        tickers: state.tickers
    }
}

export default connect (mapStateToProps)(Ticker);

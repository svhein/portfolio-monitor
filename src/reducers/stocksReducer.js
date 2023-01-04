import {database} from "../utils/firebase-config.js"
import {ref, set, child, get, orderByChild, equalTo} from "firebase/database";

const initalState = {
    tickers: [],
    IsInitialized: false // boolean checks if data is loaded from d realtime db to store
}

export default function tickersReducer(state = initalState, action){
    //let index = state.tickers.findIndex(ticker => ticker.id === action.payload.id);
    switch(action.type){       
        case 'ADD' : 
            return { 
                ...state, IsInitialized: true,  tickers: [...state.tickers, {id: action.id,
                                                     price: action.startPrice,
                                                     changePercent: action.defaultPercent,
                                                     amount: action.amount,
                                                     currency: action.currency}]
            }
        case 'SET_TICKERS' : 

            let tickerObjects = [] // tickers are saved as object of arrays

            //iterate througt the payload to create ticker object with id and name
            Object.keys(action.payload).map(function(key, index) {
                tickerObjects.push({
                    id: action.payload[index],
                    amount: 1
                })
            })

            return {
                ...state, IsInitialized: true,  tickers: action.payload
            }
        case 'REMOVE' :
            return {
                ...state, IsInitialized: true, tickers: [...state.tickers.filter(item => item.id !== action.id)]
            }
        // case 'UPDATE' : 
        //     let index = state.tickers.findIndex(ticker => ticker.id === action.payload.id)
        //     return {
        //         ...state, tickers: [...state.tickers.map((ticker, i) => i === index ? {...ticker, ...action.payload} : ticker)]
        //     }
        case 'UPDATE' : 
            let index = state.tickers.findIndex(ticker => ticker.id === action.id)
            return {
                ...state, tickers: [...state.tickers.map((ticker, i) => i === index ? {...ticker, price: action.price, changePercent: action.changePercent} : ticker)]
            }
        case 'SET_AMOUNT':
            let index_2 = state.tickers.findIndex(ticker => ticker.id === action.tickerId);
            return {
                ...state, tickers: [...state.tickers.map((ticker, i) => i === index_2 ? {...ticker, amount: parseFloat(action.newAmount)} : ticker)]
            }    
        
        case 'SET_CURRENCY':
            let index_3 = state.tickers.findIndex(ticker => ticker.id === action.id)
            return {
                ...state, tickers: [...state.tickers.map((ticker, i) => i === index_3 ? {...ticker, currency: action.updatedCurrency} : ticker)]
            } 
        case 'USER_LOGOUT':
            return initalState;
        default:
            return {...state};       
    }
}
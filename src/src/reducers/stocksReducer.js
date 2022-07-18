const initalState = {
    tickers: [] 
}

export default function tickersReducer(state = initalState, action){
    //let index = state.tickers.findIndex(ticker => ticker.id === action.payload.id);
    switch(action.type){       
        case 'ADD' : 
            return { 
                ...state, tickers: [...state.tickers, {id: action.payload.name,
                                                     price: action.startPrice,
                                                     changePercent: action.defaultPercent,
                                                     amount: action.amount,
                                                     currency: action.currency}]
            }
        case 'SET_TICKERS' : 
            return {
                ...state, tickers: action.payload
            }
        case 'REMOVE' :
            return {
                ...state, tickers: [...state.tickers.filter(item => item.id !== action.id)]
            }
        case 'UPDATE' : 
            let index = state.tickers.findIndex(ticker => ticker.id === action.payload.id)
            return {
                ...state, tickers: [...state.tickers.map((ticker, i) => i === index ? {...ticker, ...action.payload} : ticker)]
            }
        case 'SET_AMOUNT':
            let index_2 = state.tickers.findIndex(ticker => ticker.id === action.id)
            return {
                ...state, tickers: [...state.tickers.map((ticker, i) => i === index_2 ? {...ticker, amount: parseFloat(action.newAmount)} : ticker)]
            }    
        case 'SET_CURRENCY':
            let index_3 = state.tickers.findIndex(ticker => ticker.id === action.id)
            return {
                ...state, tickers: [...state.tickers.map((ticker, i) => i === index_3 ? {...ticker, currency: action.updatedCurrency} : ticker)]
            } 
        default:
            return {...state};       
    }
}
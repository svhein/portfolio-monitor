import React, { useEffect, useState } from 'react'
import './Trade.css'
import BuyForm from './BuyForm/BuyForm';
import SellForm from './SellForm/SellForm';

function Trade(props) {

    const [menu, setMenu] = useState(null);

    const menus = {
        buy: <BuyForm />,
        sell: <SellForm />
    }

  return (
    <div className="trade-wrapper">
        <h1 style={{color: "white"}}>Add Trade</h1>
            <div className='button-wrap'>
                <input type="radio" data-testid="trade-buy-button" id="buy" name='trade_action' onClick={() => setMenu('buy')}></input>
                <label for='buy'> BUY </label>
                <input type="radio" id="sell" name='trade_action' onClick={() => setMenu('sell')}></input>
                <label for='sell'> SELL </label>
            </div>
        
        {menus[menu]}
          
    </div>

  )
}

{/* <button onClick={() => setMenu('buy')}> BUY </button>
<button onClick={() => setMenu('sell')}> SELL </button> */}

export default Trade

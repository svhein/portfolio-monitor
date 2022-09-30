import React, {useState, useEffect} from 'react'
import './BuyForm.css'

function BuyForm(props) {

  const [ticker, setTicker] = useState("");
  const [price, setPrice] = useState("");
  const [amount, setAmount] = useState("");
  const [fees, setFees] = useState("");
  const [total, setTotal] = useState("");


  useEffect(() => {
    setTotal(price * amount + fees)
  }, [price, amount, fees])

  return (


    <form className='buy_form' data-testid='buy-form'>
      
      <label>Ticker
        <input type='text' />
      </label>

      <label>Price
        <input type='text' onChange={(e) => setPrice(parseFloat(e.target.value))}/> 
        <select id='price-currency'>
          <option value='eur'>€</option>
          <option value='usd'>$</option>
        </select>
      </label>
      

      <label>Amount
        <input type='text' onChange={(e) => setAmount(parseFloat(e.target.value))}/> 
      </label>

      <label>Fees
        <input type='text' onChange={(e) => setFees(parseFloat(e.target.value))}/> 
        <select id='fee-currency'>
          <option value='eur'>€</option>
          <option value='usd'>$</option>
        </select>
      </label>

      <label>Total
        <input type="text" value={total} readonly />
      </label>

      <label>Date
        <input type='date' name='date' id='date' /> 
      </label>

    </form>
  )
}

export default BuyForm

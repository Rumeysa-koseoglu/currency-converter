import React, { useState } from 'react'
import '../css/currency.css'
import { MdKeyboardDoubleArrowDown } from "react-icons/md";
import axios from 'axios';

const currencySymbols = {
    EUR: "€",
    USD: "$",
    TRY: "₺",
    JPY: "¥",
    KRW: "₩"
  };


    let BASE_URL = "https://api.freecurrencyapi.com/v1/latest"
    let API_KEY = "fca_live_fowI4fCLg5FiMkps4l8nNdp24oKhsTNiRdpA7hwp"



function Currency() {

    const [amount, setAmount] = useState(0);
    const [fromCurrency, setFromCurrency] = useState('EUR');
    const [toCurrency, setToCurrency] = useState('TRY');
    const [result, setResult] = useState(0);


    const exchange = async () => {
        // console.log(amount);
        // console.log(fromCurrency);
        // console.log(toCurrency);

       const response = await axios.get(`${BASE_URL}?apikey=${API_KEY}&base_currency=${fromCurrency}`)
        const result = (response.data.data[toCurrency] * amount).toFixed(2);
        setResult(result)
    }


    return (
        <div className='currency-inputs-div'>

            <div>
                <h3>CURRENCY CONVERTER APP</h3>
            </div>

        <div className='from-currency-div' id='currency-input-div'>
            <span className='currency-symbol'>{currencySymbols[fromCurrency]}</span>
        <input value={amount} onChange={(e) => {
            const value = e.target.value;
            if (value === '') {
                setAmount('0');
                setResult('0');
            } else if (amount === '0') {
                setAmount(value.slice(-1));
            } else {
                setAmount(value)
            }
        }} 
        type="number" className='first-currency-input'/>
            <select onChange={(e) => setFromCurrency(e.target.value)} className="from-currency-option" id='currency-option'>
                <option>EUR</option>
                <option>USD</option>
                <option>TRY</option>
                <option>JPY</option>
                <option>KRW</option>
            </select>
        </div>

        <MdKeyboardDoubleArrowDown style={{fontSize:"30px",color:"black"}}/>

        <div className='to-currency-div' id='currency-input-div'>
        <span className='currency-symbol'>{currencySymbols[toCurrency]}</span>
            <input readOnly value={result}type="number" className='second-currency-input' />
        <select onChange={(e) => setToCurrency(e.target.value)} className="to-currency-option" id='currency-option'>
                <option>TRY</option>
                <option>USD</option>
                <option>EUR</option>
                <option>JPY</option>
                <option>KRW</option>
            </select>
        </div>

        <div>
            <button onClick={exchange} className='converter-button'>Convert</button>
        </div>

        </div>
    )
}

export default Currency

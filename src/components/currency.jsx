import React, { useState } from 'react'
import '../css/currency.css'
import { MdKeyboardDoubleArrowDown } from "react-icons/md"; //we imported an arrow icon from react icons library
import axios from 'axios';//due to we want to send a get request we installed and imorted axios 

const currencySymbols = {
    EUR: "€",
    USD: "$",
    TRY: "₺",
    JPY: "¥",
    KRW: "₩"
  };// we defined currencySymbols to match each currency with its symbol


    let BASE_URL = "https://api.freecurrencyapi.com/v1/latest"
    let API_KEY = import.meta.env.VITE_CURRENCY_API_KEY;



function Currency() {

    const [amount, setAmount] = useState(0);// holds the amount entered by user. initally 0
    const [fromCurrency, setFromCurrency] = useState('EUR');
    const [toCurrency, setToCurrency] = useState('TRY');// toCurrency and fromCurrency are hold the currencies to be converted
    const [result, setResult] = useState(0);//this state holds calculated currency amount returned from the API (is printed in the result input)

    //function will run when convert button is clicked
    const exchange = async () => {
        // console.log(amount);
        // console.log(fromCurrency);
        // console.log(toCurrency);

       const response = await axios.get(`${BASE_URL}?apikey=${API_KEY}&base_currency=${fromCurrency}`)/*here, we send get request with axios.get() to API.
        base_currency=${fromCurrency} section is indicates which currency to convert from */
        const result = (response.data.data[toCurrency] * amount).toFixed(2);/*data[toCurrency] is the exchange rate information of the target currency.
        multiplied 'amount' with this value, so conversion operation is done here*/
        setResult(result)//we save the calculated result to the result state , so that it is automatically printed in the second input
    }


    return (
        <div className='currency-inputs-div'>

            <div>
                <h3>CURRENCY CONVERTER APP</h3>
            </div>

        <div className='from-currency-div' id='currency-input-div'>
            <span className='currency-symbol'>{currencySymbols[fromCurrency]}</span>
            {/* gets a number from user, the state is updated with setAmount on each write  */}
        <input value={amount} onChange={(e) => { {/* Because of the value={amount}, the state and input are synchronized */}
            const value = e.target.value;
            if (value === '') { {/* if its completely deleted; reset both inputs  */}
                setAmount('0');
                setResult('0');
            } else if (amount === '0') { {/* if current value is "0" ,means the user has entered a number. then print the new value */}
                setAmount(value.slice(-1)); {/*only get the last number (means delete the initial zero) */}
            } else {  {/*normal situation: get the entered number directly */}
                setAmount(value)
            }
        }} 
        type="number" className='first-currency-input'/>
        {/*the dropdown where the user selects which currency to convert with */}
            <select onChange={(e) => setFromCurrency(e.target.value)} className="from-currency-option" id='currency-option'>
                <option>EUR</option>
                <option>USD</option>
                <option>TRY</option>
                <option>JPY</option>
                <option>KRW</option>
            </select>
        </div>

        <MdKeyboardDoubleArrowDown style={{fontSize:"30px",color:"black"}}/> {/* symbol representing change between two species */}

        <div className='to-currency-div' id='currency-input-div'>
        <span className='currency-symbol'>{currencySymbols[toCurrency]}</span>
            <input readOnly value={result}type="number" className='second-currency-input' /> {/*updated automatically */}
            {/*the dropdown where the user selects which currency to convert to */}
        <select onChange={(e) => setToCurrency(e.target.value)} className="to-currency-option" id='currency-option'>
                <option>TRY</option>
                <option>USD</option>
                <option>EUR</option>
                <option>JPY</option>
                <option>KRW</option>
            </select>
        </div>

        <div className='button-div'>
            <button onClick={exchange} className='converter-button'>Convert</button> {/*the exchange function will run when the convert button is clicked */}
        </div>

        </div>
    )
}

export default Currency

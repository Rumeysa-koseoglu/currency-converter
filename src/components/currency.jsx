import React from 'react'
import '../css/currency.css'
import { MdKeyboardDoubleArrowDown } from "react-icons/md";

function Currency() {
    return (
        <div className='currency-inputs-div'>

            <div>
                <h3>CURRENCY CONVERTER APP</h3>
            </div>

        <div className='from-currency-div' id='currency-input-div'>
        <input type="number" className='first-currency-input' />
            <select className="from-currency-option" id='currency-option'>
                <option>EUR</option>
                <option>USD</option>
                <option>TRY</option>
            </select>
        </div>

        <MdKeyboardDoubleArrowDown style={{fontSize:"30px",color:"black"}}/>

        <div className='to-currency-div' id='currency-input-div'>
            
            <input type="number" className='second-currency-input' />
        <select className="to-currency-option" id='currency-option'>
                <option>TRY</option>
                <option>USD</option>
                <option>EUR</option>
            </select>
        </div>

        <div>
            <button className='converter-button'>Convert</button>
        </div>

        </div>
    )
}

export default Currency

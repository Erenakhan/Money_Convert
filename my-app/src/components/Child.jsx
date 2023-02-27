import { useState,useEffect } from 'react'
import '../App.css'

function Child(props) {
    const [amount,setAmount]=useState()

    /* above  const for button first take input value and set it then button on click set it to amount I made this becasue of Api's limit  */
    const [inputValue,setInputValue]=useState()

    /*this setlect values and handleChange for options value set  */
    const [selectedValue1, setSelectedValue1] = useState('');
    const [selectedValue2, setSelectedValue2] = useState('');
    const handleChange1 = (event) => {
      setSelectedValue1(event.target.value);}
    const handleChange2 = (event) => {
      setSelectedValue2(event.target.value);}

      /* my key */
      var myHeaders = new Headers();
      myHeaders.append("apikey", "faF6zlgpSySVpt0PT0eKnfeTJztT4PN0");
      
      var requestOptions = {
        method: 'GET',
        redirect: 'follow',
        headers: myHeaders
      };
        /* I couldn't take all symbols because of I Api's limit so I write it myself */
    const [options,setOptions]=useState(['EUR', 'AED', 'AFN', 'ALL', 'AMD', 'ANG', 'AOA', 'ARS', 'AUD', 'AWG', 'AZN', 'BAM', 'BBD', 'BDT', 'BGN', 'BHD', 'BIF', 'BMD', 'BND', 'BOB', 'BRL', 'BSD', 'BTC', 'BTN', 'BWP', 'BYN', 'BYR', 'BZD', 'CAD', 'CDF', 'CHF', 'CLF', 'CLP', 'CNY', 'COP', 'CRC', 'CUC', 'CUP', 'CVE', 'CZK', 'DJF', 'DKK', 'DOP', 'DZD', 'EGP', 'ERN', 'ETB', 'EUR', 'FJD', 'FKP', 'GBP', 'GEL', 'GGP', 'GHS', 'GIP', 'GMD', 'GNF', 'GTQ', 'GYD', 'HKD', 'HNL', 'HRK', 'HTG', 'HUF', 'IDR', 'ILS', 'IMP', 'INR', 'IQD', 'IRR', 'ISK', 'JEP', 'JMD', 'JOD', 'JPY', 'KES', 'KGS', 'KHR', 'KMF', 'KPW', 'KRW', 'KWD', 'KYD', 'KZT', 'LAK', 'LBP', 'LKR', 'LRD', 'LSL', 'LTL', 'LVL', 'LYD', 'MAD', 'MDL', 'MGA', 'MKD', 'MMK', 'MNT', 'MOP', 'MRO'])

     
    useEffect(()=>{
      /* for take symbols */
      fetch(  "https://api.apilayer.com/exchangerates_data/latest?" ,requestOptions)
      .then(response => response.json())
      .then(data => setOptions([data.base, ...Object.keys(data.rates)]));
        })

         /* I set result I take exchange value  */
    const [result,setResult] =useState([])

        /* for take value of exchange */
   useEffect(()=>{
    fetch( `https://api.apilayer.com/exchangerates_data/convert?to=${selectedValue2}&from=${selectedValue1}&amount=${amount}`,  requestOptions)
    .then(response => response.text())
    .then(result => setResult(result))
    .catch(error => console.log('error', error));
      }) 
  return (
  <div className="conteiner" >
    <h1>Money Converter</h1>
   <h2>Select Money</h2>
   <select className='select2' name="symbol" id="symbol" value={selectedValue1} onChange={handleChange1} >
       {
            options.map((e, i) =>
            <option key={i} value={e}>{e}</option>
            )
        }    
        </select>
      {/* first input */ }
    <input className='input1'onChange={((e)=>setInputValue(e.target.value))} value={inputValue} type="number" placeholder='Enter the money...' />

          
     <h2>Convert To =
      </h2>
        <select className='select2' name="symbol" value={selectedValue2} onChange={handleChange2} id="symbol">
        {
            options.map((e, i) =>
            <option key={i} value={e}>{e}</option>
            )
        }
        </select>


        {/* second input result.result is result of exchange*/ }
    <input className='input2' type="number" value={result.result} placeholder='Convertor results...' /> 


    <div className='button-div'>
    <button onClick={(() => setAmount(inputValue))}>Convert</button>
    </div>
       
</div>
)}

export default Child;
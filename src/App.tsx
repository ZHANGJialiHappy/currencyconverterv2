import { useEffect, useState } from "react";
import CurrencyRow from "./CurrencyRow";

const BASE_URL = 'https://api.exchangerate.host/latest'

function App() {
  const [currencyOption, setCurrencyOption] = useState<string[]>([]);
  const [fromCurrency, setFromCurrency] = useState<string>("");
  const [toCurrency, setToCurrency] = useState<string>("");
  const [exchangeRate, setExchangeRate] = useState<number>(1);
  const [amount, setAmount] = useState<number | string>(1);
  const [amountInFromCurrency, setamountInFromCurrency] = useState<boolean>(true);

  useEffect(()=>{
    fetch(BASE_URL)
    .then (res => res.json())
    .then ((data) => {
      const firstCurrency = Object.keys(data.rates)[0]
      console.log(data);
      setCurrencyOption(Object.keys(data.rates));
      setFromCurrency(data.base);
      setToCurrency(firstCurrency);
      setExchangeRate(data.rates[firstCurrency])
    })
  }, [])

  // if(amountInFromCurrency){
  //   set
  // }

  return (
    <div className="flex justify-center text-center items-center min-h-screen">
      <div className="text-2xl">
        <h1 className="text-2xl mb-5">Convert</h1>
        <CurrencyRow 
        currencyOption = {currencyOption} 
        selectedCurrency = {fromCurrency} 
        onChangeCurrencyOption = {(e)=>setFromCurrency(e.target.value)}/>
        <div>=</div>
        <CurrencyRow 
        currencyOption = {currencyOption} 
        selectedCurrency = {toCurrency}
        onChangeCurrencyOption = {(e)=>setToCurrency(e.target.value)}/>
      </div>
    </div>

  );
}

export default App;

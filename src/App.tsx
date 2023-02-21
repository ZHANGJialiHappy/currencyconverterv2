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
      setCurrencyOption(Object.keys(data.rates));
      setFromCurrency(data.base);
      setToCurrency(firstCurrency);
      setExchangeRate(data.rates[firstCurrency])
    })
  }, [])

  let fromAmount: number | string, toAmount: number | string
  if(amountInFromCurrency){
    fromAmount = amount;
    toAmount = typeof fromAmount === "number" && fromAmount >= 0 ? (Math.round(fromAmount * exchangeRate * 100) / 100) : ""
  } else {
    toAmount =amount;
    fromAmount = typeof toAmount === "number" && toAmount >= 0 ? (Math.round(toAmount / exchangeRate * 100) / 100) : ""
  }

  const handelFromAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value= e.target.value;
    if(value){
      setAmount(Number(value));
      // setAmount(Number(value));

    } else setAmount("")
    setamountInFromCurrency(true);
  }

  const handelToAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value= e.target.value;
    if(value){
      setAmount(Number(value));
    } else setAmount("")
    setamountInFromCurrency(false);
  }

  useEffect(()=>{
    fetch(`${BASE_URL}?base=${fromCurrency}&symbols=${toCurrency}`)
    .then (res => res.json())
    .then ((data) => setExchangeRate(data.rates[toCurrency]))
  }, [fromCurrency, toCurrency])

  return (
    <div className="flex justify-center text-center items-center min-h-screen">
      <div className="text-2xl">

        <h1 className="text-2xl mb-5">Convert</h1>

        <CurrencyRow 
        currencyOption = {currencyOption} 
        selectedCurrency = {fromCurrency} 
        onChangeCurrencyOption = {(e)=>setFromCurrency(e.target.value)}
        onChangeAmount = {handelFromAmount}
        amount={fromAmount}/>

        <div>=</div>

        <CurrencyRow 
        currencyOption = {currencyOption} 
        selectedCurrency = {toCurrency}
        onChangeCurrencyOption = {(e)=>setToCurrency(e.target.value)}
        onChangeAmount= {handelToAmount}
        amount={toAmount}/>
        
      </div>
    </div>

  );
}

export default App;

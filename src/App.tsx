import CurrencyRow from "./CurrencyRow";


function App() {
  return (
    <div className="flex justify-center text-center items-center min-h-screen">
      <div className="text-2xl">
        <h1 className="text-2xl mb-5">Convert</h1>
        <CurrencyRow />
        <div>=</div>
        <CurrencyRow />
      </div>
    </div>

  );
}

export default App;

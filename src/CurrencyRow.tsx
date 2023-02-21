import React from 'react'

type Props = {
    currencyOption: string[],
    selectedCurrency: string,
}

function CurrencyRow({currencyOption,selectedCurrency}: Props ) {
    return (
        <div className="flex gap-5">
            <input
                type="number"
                placeholder="Type a number"
                className="input input-bordered input-warning w-full max-w-xs flex-none"
            />

            <select 
            className="input input-bordered input-warning max-w-xs flex-1 w-32"
            value={selectedCurrency}
            >
                {currencyOption.map((option, key)=>
                <option key={option} value={option}>{option}</option>)}
            </select>
        </div>
    )
}

export default CurrencyRow

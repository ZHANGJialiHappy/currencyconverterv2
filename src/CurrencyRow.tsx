import React from 'react'

type Props = {
    currencyOption: string[],
    selectedCurrency: string,
    onChangeCurrencyOption(e: React.ChangeEvent<HTMLSelectElement>): void,
    onChangeAmount(e: React.ChangeEvent<HTMLInputElement>): void,
    amount: number | string
}

function CurrencyRow({currencyOption, selectedCurrency, onChangeCurrencyOption, onChangeAmount, amount}: Props ) {
    return (
        <div className="flex gap-5">
            <input
                type="number"
                min="0"
                placeholder="Type a number"
                className="input input-bordered input-warning w-full max-w-xs flex-none"
                onChange={onChangeAmount}
                value={amount}
            />

            <select 
            className="input input-bordered input-warning max-w-xs flex-1 w-32"
            value={selectedCurrency}
            onChange={onChangeCurrencyOption}
            >
                {currencyOption.map((option, key)=>
                <option key={option} value={option}>{option}</option>)}
            </select>
        </div>
    )
}

export default CurrencyRow

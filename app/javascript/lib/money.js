import currency from "currency.js";

export const euro = value => currency(value, {fromCents: true, symbol: '€', decimal: ',', separator: '.'});

export function priceInDisplayName(namesAndPrices) {
    return namesAndPrices.map(object => ({
        ...object,
        displayName: object.name + (object.price ? ` (${euro(object.price).format()})` : '')
    }))
}
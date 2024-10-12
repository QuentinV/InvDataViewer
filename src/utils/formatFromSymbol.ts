import { formatPercent } from './formatPercent'

const defaultFormat = (value?: number) =>
    value?.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    })

export const formatFromSymbol = (symbol?: string, value?: number) => {
    const v = symbol === '%' ? formatPercent(value) : value;
    return `${defaultFormat(v)}${(symbol?.indexOf('%') ?? -1) !== -1 ? '%' : symbol === '$' ? '$' : '' }`;
}

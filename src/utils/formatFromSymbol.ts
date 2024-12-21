import { formatPercent } from './formatPercent'

const defaultFormat = (language: string, value?: number) =>
    value?.toLocaleString(language, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    })

export const formatFromSymbol = (language: string, symbol?: string, value?: number) => {
    const v = symbol === '%' ? formatPercent(value) : value;
    return `${defaultFormat(language, v)}${(symbol?.indexOf('%') ?? -1) !== -1 ? '%' : symbol === '$' ? '$' : '' }`;
}

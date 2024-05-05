import { formatPercent } from './formatPercent'

const defaultFormat = (value?: number) =>
    value?.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    })

export const formatFromSymbol = (symbol?: string, value?: number) => {
    switch (symbol) {
        case '%':
            return `${defaultFormat(formatPercent(value))}%`
        case '$':
            return `${defaultFormat(value)}$`
        default:
            return defaultFormat(value)
    }
}

export const formatLargeNumber = (
    number?: number,
    indexAbbreviation?: number
): string => {
    if (number === undefined || number === null) {
        return ''
    }

    if (number > -1000 && number < 1000) {
        return number.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        })
    }

    const abbreviations = ['', 'K', 'M', 'B', 'T']
    let log1000 =
        indexAbbreviation == undefined || indexAbbreviation === -1
            ? Math.floor(Math.log10(Math.abs(number)) / 3)
            : indexAbbreviation

    const diff = log1000 - abbreviations.length
    if (diff >= 0) {
        log1000 -= diff + 1
    }

    const roundedNumber = (number / Math.pow(1000, log1000)).toLocaleString(
        undefined,
        {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        }
    )

    return `${roundedNumber}${indexAbbreviation === -1 ? abbreviations[log1000] : ''}`
}

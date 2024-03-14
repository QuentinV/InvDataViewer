export const formatLargeNumber = (number?: number): string => {
    if ( number === undefined || number === null ) {
        return '';
    }

    if (number > -1000 && number < 1000) {
        return number.toString();
    }

    const abbreviations = ['', 'K', 'M', 'B', 'T'];
    let log1000 = Math.floor(Math.log10(Math.abs(number)) / 3);

    const diff = log1000 - abbreviations.length;
    if ( diff >= 0 ) {
        log1000 -= (diff+1);
    } 
    
    let roundedNumber = (number / Math.pow(1000, log1000)).toFixed(2);
    roundedNumber = roundedNumber.substring(0, roundedNumber.endsWith('00') ? roundedNumber.length - 3 : ( roundedNumber.endsWith('0') ? roundedNumber.length - 1 : roundedNumber.length ) );
    
    return `${roundedNumber}${abbreviations[log1000]}`;
}
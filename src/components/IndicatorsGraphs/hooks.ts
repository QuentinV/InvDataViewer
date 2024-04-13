import { TFunction } from "i18next";
import { Data, Metrics } from "../../models/types";
import { digitsMapping, surfaceBorder, textColor, textColorSecondary } from "./constants";

export const getChartOptions = ( titleText: string ) => ({
    maintainAspectRatio: false,
    aspectRatio: 0.8,   
    responsive: true,
    plugins: {
        legend: {
            labels: {
                color: textColor
            }
        },
        title: {
            display: true,
            text: titleText
        }
    },
    scales: {
        x: {
            ticks: {
                color: textColorSecondary
            },
            grid: {
                display: false,
                color: surfaceBorder
            }
        },
        y: {
            ticks: {
                color: textColorSecondary
            },
            grid: {
                color: surfaceBorder
            }
        }
    }
});

const getData = ( title: string, label: string, years: { [key: string]: Data }, { metric, getValue }: { metric?: keyof Metrics, getValue?: (data: Data) => number|undefined } ) => {
    const arrYears = Object.keys(years).slice(-10);
    const values = arrYears.map(k => (metric ? years[k].metrics[metric] : getValue?.(years[k])) || 0);
    const min = Math.min(...values.map(v => Math.round(v)));
    const log1000 = Math.floor(Math.log10(Math.abs(min) || 1) / 3);
    
    return {
        options: getChartOptions( title ),
        data: {
            labels: arrYears,
            datasets: [
                {
                    label: `${label} ${digitsMapping[log1000] ? `(${digitsMapping[log1000]})` : ''}`,
                    data: values.map(k => {
                        if ( k === 0 ) return 0;
                        const roundedNumber = (k / Math.pow(1000, log1000)).toFixed(2);
                        return Number(roundedNumber.substring(0, roundedNumber.endsWith('00') ? roundedNumber.length - 3 : ( roundedNumber.endsWith('0') ? roundedNumber.length - 1 : roundedNumber.length ) ) );
                    }),
                    borderColor: '#106ebe'   
                }
            ]
        }
    };
}

export type ChartValueDataType = { labels: string[]; datasets: object[] };
export type ChartValueType = { data: ( years: { [key: string]: Data } ) => { options: object, data: ChartValueDataType } };
export const useChartData: (t: TFunction) => ChartValueType[][] = (t) => {
    const tp = 'ticker.metrics.charts';
    return [
        [
            { data: ( years ) => getData( t(`${tp}.epsGrowth.title`), t(`${tp}.epsGrowth.dataset1`), years, { metric: 'adjustedNetIncome' } ) },
            { data: ( years ) => getData( t(`${tp}.operatingIncome.title`), t(`${tp}.operatingIncome.dataset1`), years, { metric: 'operatingIncome' } ) },
            { data: ( years ) => {
                const arrYears = Object.keys(years).splice(-10);
                return {
                    options: getChartOptions( t(`${tp}.ownersEarningsGrowth.title`) ),
                    data: {
                        labels: arrYears,
                        datasets: [
                            {
                                label: t(`${tp}.ownersEarningsGrowth.dataset1`),
                                data: arrYears.map(k => years[k].metrics.ownersEarningsGrowth),
                                borderColor: '#106ebe'   
                            },
                            {
                                label: t(`${tp}.ownersEarningsGrowth.dataset2`),
                                pointStyle: false,
                                data: arrYears.map(() => 6.5),
                                borderColor: 'black'
                            }
                        ]
                    }
                } 
            } },
            { data: ( years ) => getData( t(`${tp}.ownersEarningsPerShare.title`), t(`${tp}.ownersEarningsPerShare.dataset1`), years, { metric: 'ownersEarningsPerShare' } ) },
            { data: ( years ) => {
                const arrYears = Object.keys(years).splice(-10);
                return {
                    options: getChartOptions( t(`${tp}.revenueGrowthVsCOGSGrowth.title`) ),
                    data: {
                        labels: arrYears,
                        datasets: [
                            {
                                label: t(`${tp}.revenueGrowthVsCOGSGrowth.dataset1`),
                                data: arrYears.map(k => years[k].metrics.revenueGrowth),
                                borderColor: '#106ebe'   
                            },
                            {
                                label: t(`${tp}.revenueGrowthVsCOGSGrowth.dataset2`),
                                pointStyle: false,
                                data: arrYears.map(k => years[k].metrics.cogsGrowth),
                                borderColor: 'brown'
                            }
                        ]
                    }
                } 
            } }
        ],
        [
            { data: ( years ) => getData( t(`${tp}.cashEquivalents.title`), t(`${tp}.cashEquivalents.dataset1`), years, { getValue: data => data.BALANCE_SHEET.CASH_AND_CASH_EQUIVALENTS } ) }
        ],
        [],
        [
            { data: ( years ) => {
                const arrYears = Object.keys(years).splice(-10);
                return {
                    options: getChartOptions( t(`${tp}.grossProfitMargin.title`) ),
                    data: {
                        labels: arrYears,
                        datasets: [
                            {
                                label: t(`${tp}.grossProfitMargin.dataset1`),
                                data: arrYears.map(k => years[k].metrics.grossProfitMargin),
                                borderColor: '#106ebe'   
                            },
                            {
                                label: t(`${tp}.grossProfitMargin.dataset2`),
                                pointStyle: false,
                                data: arrYears.map(() => 40),
                                borderColor: 'black'
                            }
                        ]
                    }
                } 
            } },
            { data: ( years ) => {
                const arrYears = Object.keys(years).splice(-10);
                return {
                    options: getChartOptions( t(`${tp}.sgaAMargin.title`) ),
                    data: {
                        labels: arrYears,
                        datasets: [
                            {
                                label: t(`${tp}.sgaAMargin.dataset1`),
                                data: arrYears.map(k => years[k].metrics.vvRevenue),
                                borderColor: '#106ebe'   
                            },
                            {
                                label: t(`${tp}.sgaAMargin.dataset2`),
                                pointStyle: false,
                                data: arrYears.map(() => 30),
                                borderColor: 'black'
                            }
                        ]
                    }
                } 
            } }
        ],
        []
    ] 
}
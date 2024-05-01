import { TFunction } from "i18next";
import { Data, GlobalMetrics, Metrics } from "../../models/types";
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
export interface ChartAdditionalData {
    label: string;
    value: number;
    symbol: string;
}
export type ChartValueType = { data: ( years: { [key: string]: Data }, globalMetrics?: GlobalMetrics ) => { options: object, data: ChartValueDataType, additionalData?: ChartAdditionalData[] } };
export const useChartData: (t: TFunction) => ChartValueType[][] = (t) => {
    const tp = 'ticker.metrics.charts';
    return [
        [
            { data: ( years, globalMetrics ) => ({
                ...getData( t(`${tp}.epsGrowth.title`), t(`${tp}.epsGrowth.dataset1`), years, { metric: 'adjustedNetIncomePerShare' } ),
                additionalData: [
                    { label: t(`${tp}.epsGrowth.cagrAdjustedProfit`), value: globalMetrics?.cagrAdjustedProfit || 0, symbol: '%' },
                    { label: t(`${tp}.epsGrowth.cagrEarningsPerShare`), value: globalMetrics?.cagrEarningsPerShare || 0, symbol: '%' },
                    { label: t(`${tp}.epsGrowth.10yAvgEarningsPerShare`), value: globalMetrics?.tenYAvgEarningsPerShare || 0, symbol: '$' }
                ]
            }) },
            { data: ( years, globalMetrics ) => ({
                ...getData( t(`${tp}.operatingIncome.title`), t(`${tp}.operatingIncome.dataset1`), years, { metric: 'operatingIncome' } ),
                additionalData: [
                    { label: t(`${tp}.operatingIncome.cagrOperatingIncome`), value: globalMetrics?.cagrOperatingIncome || 0, symbol: '%' },
                    { label: t(`${tp}.operatingIncome.cagrOperatingIncomePerShare`), value: globalMetrics?.cagrOperatingIncomePerShare || 0, symbol: '%' },
                    { label: t(`${tp}.operatingIncome.10yAvgEbitPerShare`), value: globalMetrics?.tenYAvgEbitPerShare || 0, symbol: '$' }
                ]
            }) },
            { data: ( years, globalMetrics ) => {
                const arrYears = Object.keys(years).splice(-10);
                return {
                    options: getChartOptions( t(`${tp}.revenueGrowthVsCOGSGrowth.title`) ),
                    data: {
                        labels: arrYears,
                        datasets: [
                            {
                                label: t(`${tp}.revenueGrowthVsCOGSGrowth.dataset1`),
                                data: arrYears.map(k => years[k].metrics.revenuePerShare),
                                borderColor: '#106ebe'   
                            },
                            {
                                label: t(`${tp}.revenueGrowthVsCOGSGrowth.dataset2`),
                                pointStyle: false,
                                data: arrYears.map(k => years[k].metrics.costsPerShare),
                                borderColor: 'red'
                            }
                        ]
                    },
                    additionalData: [
                        { label: t(`${tp}.revenueGrowthVsCOGSGrowth.cagrRevenue`), value: globalMetrics?.cagrRevenue || 0, symbol: '%'},
                        { label: t(`${tp}.revenueGrowthVsCOGSGrowth.cagrRevenuePerShare`), value: globalMetrics?.cagrRevenuePerShare || 0, symbol: '%'}
                    ]
                } 
            } }
        ],
        [
            { 
                data: ( years ) => {
                    const lastYear = Object.keys(years)[Object.keys(years).length-1];
                    const bs = years[lastYear].BALANCE_SHEET;
                    return {
                        ...getData( t(`${tp}.cashEquivalents.title`), t(`${tp}.cashEquivalents.dataset1`), years, { getValue: data => data.BALANCE_SHEET.CASH_AND_CASH_EQUIVALENTS } ),
                        additionalData: [
                            { label: t(`${tp}.cashEquivalents.cashToShortTermDebtRatio`), value: (bs.CASH_AND_CASH_EQUIVALENTS || 0) / (bs.TOTAL_CURRENT_LIABILITIES || 1), symbol: '%'}
                        ] 
                    }
                }
            },
            { 
                data: ( years ) => {
                    const lastYear = Object.keys(years)[Object.keys(years).length-1];
                    const lastYearData = years[lastYear];
                    const freeCashFlow = lastYearData.metrics.freeCashFlow;
                    const ltd = lastYearData.BALANCE_SHEET.LONG_TERM_DEBT || 1;
                    return {
                        options: getChartOptions( t(`${tp}.cashflowToLongTermDebtRatio.title`) ),
                        data: {
                            labels: [lastYear, String(Number(lastYear) + 3), String(Number(lastYear) + 4)],
                            datasets: [
                                {
                                    label: t(`${tp}.cashflowToLongTermDebtRatio.dataset1`),
                                    data: [1, 3, 4].map( k => freeCashFlow * k ),
                                },
                                {
                                    label: t(`${tp}.cashflowToLongTermDebtRatio.dataset2`),
                                    data: [0, 0, 0].map( k => ltd ),
                                }
                            ]
                        }
                    }
                }
            },
            { 
                data: ( years ) => getData( t(`${tp}.cashflowRatio.title`), t(`${tp}.cashflowRatio.dataset1`), years, { getValue: data => ((data.CASH_FLOW.NET_CASH_PROVIDED_BY_OPERATING_ACTIVITIES || 0) / (data.BALANCE_SHEET.TOTAL_CURRENT_LIABILITIES || 1)) * 100 } )
            }            
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
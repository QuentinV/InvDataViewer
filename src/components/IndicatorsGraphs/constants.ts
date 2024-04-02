import { Data, Metrics } from "../../models/types";

const textColor = '#333333';
const textColorSecondary = '#848484';
const surfaceBorder = '#c8c8c8';
const digitsMapping = ['', 'Thousands', 'Millions', 'Billions', 'Trillions'];

export const categories = ['Growth', 'Liquidity', 'Debt ratio', 'Profitability', 'Miscellaneous'];

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

type ChartDataType = { data: ( years: { [key: string]: Data } ) => { options: object, data: object } };
export const chartData: ChartDataType[][] = [
    [
        { data: ( years ) => getData( 'EPS Growth', 'Adjusted net income', years, { metric: 'adjustedNetIncome' } ) },
        { data: ( years ) => getData( 'Operating income', 'OIPS', years, { metric: 'operatingIncome' } ) },
        { data: ( years ) => {
            const arrYears = Object.keys(years).splice(-10);
            return {
                options: getChartOptions( 'Owners Earnings Growth' ),
                data: {
                    labels: arrYears,
                    datasets: [
                        {
                            label: 'OE Growth',
                            data: arrYears.map(k => years[k].metrics.ownersEarningsGrowth),
                            borderColor: '#106ebe'   
                        },
                        {
                            label: '6.5% is good',
                            pointStyle: false,
                            data: arrYears.map(() => 6.5),
                            borderColor: 'black'
                        }
                    ]
                }
            } 
        } },
        { data: ( years ) => getData( 'Owners Earnings per share', 'Owners Earnings per share', years, { metric: 'ownersEarningsPerShare' } ) },
        { data: ( years ) => {
            const arrYears = Object.keys(years).splice(-10);
            return {
                options: getChartOptions( 'Revenue Growth vs COGS Growth' ),
                data: {
                    labels: arrYears,
                    datasets: [
                        {
                            label: 'Revenue Growth (%)',
                            data: arrYears.map(k => years[k].metrics.revenueGrowth),
                            borderColor: '#106ebe'   
                        },
                        {
                            label: 'COGS Growth (%)',
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
        { data: ( years ) => getData( 'Cash & Equivalents', 'Cash & Equivalents', years, { getValue: data => data.BALANCE_SHEET.CASH_AND_CASH_EQUIVALENTS } ) }
    ],
    [],
    [
        { data: ( years ) => {
            const arrYears = Object.keys(years).splice(-10);
            return {
                options: getChartOptions( 'Gross Profit Margin' ),
                data: {
                    labels: arrYears,
                    datasets: [
                        {
                            label: 'Gross Profit Margin (%)',
                            data: arrYears.map(k => years[k].metrics.grossProfitMargin),
                            borderColor: '#106ebe'   
                        },
                        {
                            label: '40% is good',
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
                options: getChartOptions( 'SgaA margin' ),
                data: {
                    labels: arrYears,
                    datasets: [
                        {
                            label: 'V&V/Revenue (%)',
                            data: arrYears.map(k => years[k].metrics.vvRevenue),
                            borderColor: '#106ebe'   
                        },
                        {
                            label: '30% is good',
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
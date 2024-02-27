import { Data, Metrics } from "../../models/types";

const textColor = '#333333';
const textColorSecondary = '#848484';
const surfaceBorder = '#c8c8c8';
const digitsMapping = ['Thousands', 'Millions', 'Billions', 'Trillions'];

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
    const digits = Math.trunc(Math.min(...values).toString().length / 3);
    const div = Number('1' + Array(digits*3).fill('0').join(''));
    return {
        options: getChartOptions( title ),
        data: {
            labels: arrYears,
            datasets: [
                {
                    label: `${label} (${digitsMapping[digits-1]})`,
                    data: values.map(k => (k/div).toFixed(2)),
                    borderColor: '#106ebe'   
                }
            ]
        }
    }
}

export const chartData: {[key:string]: { category: number; data: ( years: { [key: string]: Data } ) => { options: object, data: object } } } = {
    'OperatingIncome': { category: 0, data: ( years ) => getData( 'Operating income', 'OIPS', years, { metric: 'operatingIncome' } ) },
    'AdjustedNetIncome': { category: 0, data: ( years ) => getData( 'EPS Growth', 'Adjusted net income', years, { metric: 'adjustedNetIncome' } ) },
    'GrossProfitMargin': { category: 3, data: ( years ) => {
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
    'RevenueGrowthVsCOGSGrowth': { category: 0, data: ( years ) => {
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
    } },
    'CashAndEquivalents': { category: 1, data: ( years ) => getData( 'Cash & Equivalents', 'Cash & Equivalents', years, { getValue: data => data.BALANCE_SHEET.CASH_AND_CASH_EQUIVALENTS } ) },
    'SgaAmargin': { category: 3, data: ( years ) => {
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
    } },
}
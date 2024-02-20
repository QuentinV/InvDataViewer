import { Data } from "../../models/types";

const textColor = '#333333';
const textColorSecondary = '#848484';
const surfaceBorder = '#c8c8c8';

export const chartOptions = {
    maintainAspectRatio: false,
    aspectRatio: 0.8,
    plugins: {
        legend: {
            labels: {
                color: textColor
            }
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
};

export const chartData: {[key:string]: ( years: { [key: string]: Data } ) => object} = {
    'GrossProfitMargin': ( years ) => {
        const arrYears = Object.keys(years);
        return {
            labels: arrYears,
            datasets: [
                {
                    label: 'Gross Profit Margin',
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
}
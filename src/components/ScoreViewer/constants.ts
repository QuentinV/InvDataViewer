
export const chartOptions = {
    
    plugins: {
        legend: {
            display: false
        }
    },
    elements: {
        line: {
            borderWidth: 3
        }
    },
    scales: {
        r: {
            ticks: {
                display: false // Hides the labels in the middle (numbers)
            },
            grid: {
                color: '#BBB'
            }
        }
    }
};

import { TFunction } from "i18next";
import { PointsData, ScoreConfig } from "../../models/types";

export const useScoreChartData = ({ t, config, data } : { t: TFunction, config: ScoreConfig; data: PointsData }) => {
    return {
        labels: Object.keys(config).map( k => t(`ticker.metrics.categories.${k}`)),
        datasets: [{
            label: 'Score',
            data: [28, 48, 40, 19],
            fill: true,
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgb(54, 162, 235)',
            pointBackgroundColor: 'rgb(54, 162, 235)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgb(54, 162, 235)'
        }]
    }
}
import { TFunction } from "i18next";
import { PointsData, ScoreConfig } from "../../models/types";

export const getScoreChartData = ({ t, config, data } : { t: TFunction, config: ScoreConfig; data: PointsData }) => {
    const scores = Object.keys(config).map( k => {
        const details = config[k].details;
        return Object.keys(details).reduce( (prev, kv) => prev += ((details[kv].value/100) * (data[kv]?.value || 0)), 0 );
    });
    return {
        labels: Object.keys(config).map( k => t(`ticker.metrics.categories.${k}`)),
        datasets: [{
            label: t('ticker.metrics.categories.score'),
            data: scores,
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
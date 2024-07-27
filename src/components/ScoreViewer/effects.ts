import { TFunction } from "i18next";
import { ScoreConfig } from "../../models/types";
import { ScoresData } from "../../models/scores/types";
import { MIN } from "./constants";

export const getScoreChartData = ({ t, config, data } : { t: TFunction, config: ScoreConfig; data: ScoresData }) => {
    const scores = Object.keys(config).map( k => {
        const value = config[k].value || 0;
        const details = config[k].details;
        return Number((Object.keys(details)
                     .reduce( (prev, kv) => prev += ((details[kv].value/100) * (data[kv]?.value || 0)), 0 ) * value / 100).toFixed(2));
    });
    const area1 = Object.keys(config).map( k => config[k].areas[0] );
    const area2 = Object.keys(config).map( k => config[k].areas[1] );
    return {
        labels: Object.keys(config).map( k => t(`ticker.metrics.categories.${k}`)),
        datasets: [
            {
                label: t('ticker.metrics.categories.score'),
                data: scores,
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgb(54, 162, 235)',
                pointBackgroundColor: 'rgb(54, 162, 235)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgb(54, 162, 235)',
                fill: { value: MIN }
            },
            {
                label: '',
                data: area1,
                fill: { value: MIN },
                pointRadius: 0,
                backgroundColor: 'grey',
                borderColor: 'grey'
            },
            {
                label: '',
                data: area2,
                fill: "-1",
                pointRadius: 0,
                backgroundColor: '#BBB',
                borderColor: '#BBB'
            }
        ]
    }
}
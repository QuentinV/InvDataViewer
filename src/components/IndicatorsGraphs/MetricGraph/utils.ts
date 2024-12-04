import { TFunction } from "i18next";
import { InvData } from "../../../models/types";
import { ChartOptions, ChartSettings } from "../types";
import {
    surfaceBorder,
    textColor,
    textColorSecondary,
} from '../constants'
import { formatPercent } from "../../../utils/formatPercent";

export const getChartOptions = ({ titleText, config } : { titleText: string, config: ChartOptions }) => {
    const res: any = {
        maintainAspectRatio: false,
        aspectRatio: 0.8,
        responsive: true,
        plugins: {
            legend: {
                labels: {
                    color: textColor,
                },
            },
            title: {
                display: true,
                text: titleText,
            },
        }
    }
    if ( !config.hideScales ) {
        res.scales = {
            x: {
                stacked: !!config.stacked,
                ticks: {
                    color: textColorSecondary,
                },
                grid: {
                    display: false,
                    color: surfaceBorder,
                },
            },
            y: {
                stacked: !!config.stacked,
                ticks: {
                    color: textColorSecondary,
                },
                grid: {
                    color: surfaceBorder,
                },
            },
        };
    }
    return res;
}

const getValue = (v: any, keys: string[]): any => {
    if ( !v ) return v;
    return keys.length ? getValue(v[keys[0]], keys.slice(1)) : v;
}

function evalFormulaForYear(key: string, formula: string, data: InvData) {
    'use strict';
    const years = Object.keys(data.years || {});
    // eslint-disable-next-line
    const ly = data?.years?.[Number(years[years.length-1])] || {};

    try {
        return eval(formula);
    } catch( e ) {
        throw `Problem with ${key}\nFull error: ${JSON.stringify(e)}`
    }
}


const getLabels = (config: ChartOptions, data: InvData): string[] => {
    'use strict';
    const years = Object.keys(data.years || {});
    if ( config.labels === 'years' )
        return years.slice(-10);
    if ( typeof config.labels === 'object' ) {
        // eslint-disable-next-line
        const lastYear = Number(years[years.length-1]);
        return config.labels.map( k => eval( k ) );
    }
    return [];
}

const getDatasets = ({ labels, tKeyPrefix, config, data, t } : { labels: string[], tKeyPrefix: string; config: ChartOptions, data: InvData, t: TFunction }) => {
    const dataYears = data?.years;

    return config.datasets.map( (c, index) => {
        let dataset = null;
    
        if ( c.constant ) {
            const constant = c.constant;
            dataset = labels.map( () => constant );
        } else if ( c.metric ) {
            const metricKey = c.metric; 
            dataset = labels.map( k => dataYears?.[k]?.metrics?.[metricKey] )
        } else if ( c.data ) {
            const dataKeys = c.data.split('.');
            dataset = labels.map( k => getValue(dataYears?.[k], dataKeys) )
        } else if ( c.formula ) {
            dataset = evalFormulaForYear(config.key, c.formula, data);
        }

        if (c.symbol === '%') {
            dataset = dataset.map( (d?: number) => formatPercent(d) );
        } else {
            const min = Math.min(...dataset.map((v: number) => Math.round(v)))
            const log1000 = Math.floor(Math.log10(Math.abs(min) || 1) / 3)
            dataset = dataset.map((k: number) => {
                if (k === 0) return 0
                const roundedNumber = (
                    k / Math.pow(1000, log1000)
                ).toFixed(2)
                return Number(
                    roundedNumber.substring( 0,
                        roundedNumber.endsWith('00')
                            ? roundedNumber.length - 3
                            : roundedNumber.endsWith('0')
                                ? roundedNumber.length - 1
                                : roundedNumber.length
                    )
                )
            })
        }

        return {
            type: config?.type || 'line',
            label: t(`${tKeyPrefix}.dataset${index+1}`),
            borderColor: c.borderColor,
            data: dataset
        }
    });
}

const getAdditionalData = ({ tKeyPrefix, config, data, t } : { tKeyPrefix: string; config: ChartOptions, data: InvData, t: TFunction }) => {
    return config.additionalData?.map( c => {
        let value: number | undefined = undefined;
        if ( c.metric ) {
            value = data.metrics[c.key];
        } else if ( c.formula ) {
            value = evalFormulaForYear( c.key, c.formula, data );
        }

        return {
            label: t(`${tKeyPrefix}.${c.key}`),
            symbol: c.symbol,
            value
        }
    })
}

export const getData = ({ config, data, t } : { config: ChartOptions, data: InvData, t: TFunction }): ChartSettings => {
    const tp = `ticker.metrics.charts.${config.key}`;
    const labels = getLabels(config, data);
    return {
        options: getChartOptions({ titleText: t(`${tp}.title`), config }),
        data: {
            labels,
            datasets: getDatasets({ labels, config, data, t, tKeyPrefix: tp })
        },
        additionalData: getAdditionalData({ config, data, t, tKeyPrefix: tp })
    }
}
import { attach, createEffect, createEvent, createStore, sample } from 'effector';
import { PointData, PointsData } from './types';
import { api } from '../../api/invData';

const $ticker = createStore<string>('');
const setTicker = createEvent<string>();
$ticker.on(setTicker, (_, state) => state);

const getScoresForActiveTickerFx = attach({
    source: $ticker,
    mapParams: ( _params: unknown, ticker: string ) => ({ ticker }),
    effect: createEffect(async ({ ticker }: { ticker: string }) => {
        const res = await api(`invData/points/${ticker}`)
        return res.json();
    })
})

const saveScoreFx = attach({
    source: $ticker,
    mapParams: ( params: PointData, ticker: string ) => ({ ...params, ticker }),
    effect: createEffect(({ ticker, graphKey, value }: { ticker: string, graphKey: string, value: number }) => {
        api(`invData/points`, {
            method: 'POST',
            body: JSON.stringify({ ticker, graphKey, value }),
        })
    })
})

const $scores = createStore<PointsData | null>(null);
const setScore = createEvent<PointData>();
$scores
    .on(getScoresForActiveTickerFx.doneData, (_, state) => state)
    .on(setScore, (current, state) => ({ ...current, ...{ [state.graphKey]: state }}));

sample({
    source: $ticker, 
    fn: ticker => ({ ticker }),
    target: getScoresForActiveTickerFx
})

sample({
    clock: saveScoreFx.done,
    fn: ( { params: {graphKey, value} } ): PointData => ({ graphKey, value }),
    target: setScore
})

export const scoresStores = {
    $scores
}

export const scoresEvents = {
    setTicker
}

export const scoresEffects = {
    getScoresForActiveTickerFx,
    saveScoreFx
}
import { attach, createEffect, createEvent, createStore, sample } from 'effector';
import { ScoreData, ScoresData } from './types';
import { api } from '../../api/invData';

const $ticker = createStore<string>('');
const setTicker = createEvent<string>();
$ticker.on(setTicker, (_, state) => state);

const getScoresForActiveTickerFx = attach({
    source: $ticker,
    mapParams: ( _params: unknown, ticker: string ) => ({ ticker }),
    effect: createEffect(async ({ ticker }: { ticker: string }) => {
        const res = await api(`invData/scores/${ticker}`)
        return res.json();
    })
})

const saveScoreFx = attach({
    source: $ticker,
    mapParams: ( params: ScoreData, ticker: string ) => ({ ...params, ticker }),
    effect: createEffect(({ ticker, graphKey, value }: { ticker: string, graphKey: string, value: number }) => {
        api(`invData/scores`, {
            method: 'POST',
            body: JSON.stringify({ ticker, graphKey, value }),
        })
    })
})

const $scores = createStore<ScoresData | null>(null);
const setScore = createEvent<ScoreData>();
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
    fn: ( { params: {graphKey, value} } ): ScoreData => ({ graphKey, value }),
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
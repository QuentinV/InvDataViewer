import { attach, createEffect, createEvent, createStore, sample } from 'effector';
import { ScoreData, ScoresData } from './types';
import { api } from '../../api/invData';

const $cik = createStore<number>(0);
const setCik = createEvent<number>();
$cik.on(setCik, (_, state) => state);

const getScoresForActiveCikFx = attach({
    source: $cik,
    mapParams: ( _params: unknown, cik: number ) => ({ cik }),
    effect: createEffect(async ({ cik }: { cik: number }) => {
        const res = await api(`invData/companies/${cik}/metrics/scores`)
        return res.json();
    })
})

const saveScoreFx = attach({
    source: $cik,
    mapParams: ( params: ScoreData, cik: number ) => ({ ...params, cik }),
    effect: createEffect(({ cik, graphKey, value }: { cik: number, graphKey: string, value: number }) => {
        api(`invData/companies/${cik}/metrics/scores`, {
            method: 'POST',
            body: JSON.stringify({ graphKey, value }),
        })
    })
})

const $scores = createStore<ScoresData | null>(null);
const setScore = createEvent<ScoreData>();
$scores
    .on(getScoresForActiveCikFx.doneData, (_, state) => state)
    .on(setScore, (current, state) => ({ ...current, ...{ [state.graphKey]: state }}));

sample({
    source: $cik, 
    fn: cik => ({ cik }),
    target: getScoresForActiveCikFx
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
    setCik
}

export const scoresEffects = {
    getScoresForActiveCikFx,
    saveScoreFx
}
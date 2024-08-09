import { attach, createEffect, createEvent, createStore, sample } from 'effector';
import { ScoreData, ScoresData } from './types';
import { api } from '../../../api/invData';

const $cik = createStore<number>(0);
const setCik = createEvent<number>();
$cik.on(setCik, (_, state) => state);

const getScoresForActiveCikFx = attach({
    source: $cik,
    mapParams: ( _params: unknown, cik: number ) => ({ cik }),
    effect: createEffect(async ({ cik }: { cik: number }) => api(`invData/companies/${cik}/metrics/scores`))
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

const $reloadGlobalScore = createStore<boolean>(true);
const setReloadGlobalScore = createEvent<boolean>();
$reloadGlobalScore.on(setReloadGlobalScore, (_, state) => state).on(setScore, () => true);

sample({
    source: $cik,
    fn: () => true,
    target: setReloadGlobalScore
})


export const metricsScoresStores = {
    $scores,
    $reloadGlobalScore
}

export const metricsScoresEvents = {
    setCik,
    setReloadGlobalScore
}

export const metricsScoresEffects = {
    getScoresForActiveCikFx,
    saveScoreFx
}
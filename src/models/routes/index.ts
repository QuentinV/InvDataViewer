import { createEvent, createStore } from "effector";
import React from "react";

const $navigateTo = createStore<string | null>(null);
const setNavigateTo = createEvent<string | null>();
$navigateTo.on(setNavigateTo, (_, state) => state);

const $refs = createStore<{[key:string]: React.MutableRefObject<any>}>({});
const setRef = createEvent<{ key: string, ref: React.MutableRefObject<any>}>();
$refs.on(setRef, (current, state) => ({ ...current, [state.key]: state.ref }));

export const navs = {
    $navigateTo,
    setNavigateTo,
    $refs,
    setRef
}
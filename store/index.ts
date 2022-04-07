import {  configureStore } from '@reduxjs/toolkit';
import reducer from './reducers';
import { createWrapper } from "next-redux-wrapper";
import thunk from 'redux-thunk';

export const store =  configureStore({
    reducer,
    devTools: process.env.NODE_ENV !== 'production',
    middleware: [thunk]
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;

// Wrap the store with next-redux-wrapper
export const wrapper = createWrapper(() => store);
import { configureStore } from '@reduxjs/toolkit';
import {localSlice} from './slices/localSlice';
import { newsSlice } from './slices/news/newsSlice';

const store = configureStore({
    reducer: {
        local: localSlice.reducer,
        news: newsSlice.reducer
    },
})



export default store;

export type IRootStore = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;


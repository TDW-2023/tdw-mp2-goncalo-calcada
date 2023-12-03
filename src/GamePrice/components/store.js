import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query/react';
import { listgamedealsApi } from '../redux/listgamedeals';
import thunk from 'redux-thunk';
import fetchGames from '../redux/listcardreducer';


export const store = configureStore({
    reducer: {
        games: fetchGames,
        [listgamedealsApi.reducerPath]: listgamedealsApi.reducer,



    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(listgamedealsApi.middleware, thunk),

});

setupListeners(store.dispatch);
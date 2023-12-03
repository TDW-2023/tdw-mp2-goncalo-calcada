import { createSlice } from '@reduxjs/toolkit';
const initialState = {
    deals: [],
    size: 10,
    loading: false,
    error: null,
    currentPage: 1,
    loaded: false,
    detail: null,
};

const gamesSlice = createSlice({
    name: 'fetchGames',
    initialState,
    reducers: {
        fetchGamesStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        fetchGamesSuccess: (state, action) => {

            state.loading = false;
            state.deals = action.payload;
            state.loaded = true;

        },
        fetchGamesFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        updateCurrentPage: (state, action) => {

            if (action.payload.size) {
                state.size = action.payload.size;
            }
            if (action.payload.currentPage) {
                state.currentPage = action.payload.currentPage;
            }
        },
        fetchGameDetailStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        fetchGameDetailSuccess: (state, action) => {
            state.loading = false;
            state.detail = action.payload;
            state.loaded = true;

        },
        fetchGameDetailFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },

    },
});

export const {
    fetchGamesStart,
    fetchGamesSuccess,
    fetchGamesFailure,
    updateCurrentPage,
    fetchGameDetailStart,
    fetchGameDetailSuccess,
    fetchGameDetailFailure,
} = gamesSlice.actions;

export default gamesSlice.reducer;
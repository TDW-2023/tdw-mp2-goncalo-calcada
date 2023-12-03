import { createSlice } from '@reduxjs/toolkit';

const initialDetailsState = {
    gameInfo: {},
    loading: false,
    error: null,
};

const MasterDetailSlice = createSlice({
    name: 'masterDetail',
    initialState: initialDetailsState,
    reducers: {
        fetchGameDetailsStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        fetchGameDetailsSuccess: (state, action) => {
            state.loading = false;
            state.gameInfo = action.payload;
        },
        fetchGameDetailsFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const {
    fetchGameDetailsStart,
    fetchGameDetailsSuccess,
    fetchGameDetailsFailure,
} = MasterDetailSlice.actions;


export default MasterDetailSlice.reducer;

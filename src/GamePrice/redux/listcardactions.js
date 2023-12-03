import { createAsyncThunk } from '@reduxjs/toolkit';
export const fetchGames = createAsyncThunk(
    'games/fetchGames',  // reducer e acçao 
    async ({ page, size }) => {
        try {



            const apiUrl = `https://www.cheapshark.com/api/1.0/deals?storeID=${page}&pageSize=${size}`;

            const response = await fetch(apiUrl);
            const apiData = await response.json();

            return apiData;
        } catch (error) {
            throw new Error(`Erro ao buscar os jogos: ${error.message}`);
        }
    }

);


export const fetchGameDetail = createAsyncThunk(
    'games/fetchGameDetail',
    async (dealID) => {
        try {

            const detailApiUrl = `https://www.cheapshark.com/api/1.0/deals?id=${dealID}&k=1`;
            console.log('Detalhes do jogo:', detailApiUrl);
            const response = await fetch(detailApiUrl);
            console.log('Detalhes do jogo2:', response);
            const detailData = await response.json();
            console.log('Detalhes do jogo3:', detailData);
            return detailData;
        } catch (error) {
            throw new Error(`Erro ao buscar detalhes do jogo: ${error.message}`);
        }
    }
);



import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const listgamedealsApi = createApi({
    reducerPath: 'listgamedealsApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://www.cheapshark.com/api',
    }),
    endpoints: (builder) => ({
        getGameDeals: builder.query({
            query: () => '1.0/deals?storeID=1&lowerPrice=0&sortBy=Price&pageSize=10'
        }),
    }),
});

export const { useGetGameDealsQuery } = listgamedealsApi;
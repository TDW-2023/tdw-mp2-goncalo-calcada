import gamesReducer, {
    fetchGamesStart,
    fetchGamesSuccess,
    fetchGamesFailure,

} from '../src/GamePrice/redux/listcardreducer';

describe('gamesReducer', () => {
    it('fetchGamesStart', () => {
        const initialState = { loading: false };
        const nextState = gamesReducer(initialState, fetchGamesStart());
        expect(nextState.loading).toEqual(true);
        expect(nextState.error).toBeNull();
    });

    it('fetchGamesSuccess', () => {
        const initialState = { loading: true, deals: [] };
        const payload = {
            dealID: "QqBMs7m4CdK%2FAmfbqwtJguO%2FicxbAF4mU7N5i64VGlA%3D",
            dealRating: "9.5",
            gameID: "219387",
        };
        const nextState = gamesReducer(initialState, fetchGamesSuccess(payload));
        expect(nextState.loading).toEqual(false);
        expect(nextState.deals).toEqual(payload);
        expect(nextState.loaded).toEqual(true);
    });

    it('fetchGamesFailure', () => {
        const initialState = { loading: true, error: null };
        const errorPayload = 'An error occurred';
        const nextState = gamesReducer(initialState, fetchGamesFailure(errorPayload));
        expect(nextState.loading).toEqual(false);
        expect(nextState.error).toEqual(errorPayload);
    });


});
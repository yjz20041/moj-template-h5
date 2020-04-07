import reducerFactory from '../reducerFactory';

const TEST = 'app/home/test';

// Reducer
export const reducers = {
    [`${TEST}_FULFILLED`]: (state, { payload }) => {
        const nextHello = payload.data;
        return {
            hello: nextHello
        };
    }
};

// Action Creators
export const actions = {
    test: () => ({
        type: TEST,
        payload: new Promise((resolve) => {
            setTimeout(() => resolve, 1000);
        })
    })
};

export default reducerFactory(reducers);

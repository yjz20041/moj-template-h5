
export default reducers => (state = {}, action = {}) => ({
    ...state,
    ...((typeof reducers[action.type] === 'function' && reducers[action.type](state, action)) || {})
});

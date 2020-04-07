import {
    combineReducers, createStore, applyMiddleware, bindActionCreators
} from 'redux';
import { connect } from 'react-redux';
import promiseMiddleware from 'redux-promise-middleware';
import home, { actions as actionsHome } from './home';


const combinedActions = {
    home: actionsHome
};

const middlewares = [promiseMiddleware()];

if (process.env.NODE_ENV === 'development') {
    // const { logger } = require('redux-logger');

    // middlewares.push(logger);
}

export const connectByModule = (moduleName, mapStateToProps, mapDispatchToProps) => {
    const mapDispatchToPropsWrap = (dispatch) => {
        let actions = {};
        Object.keys(combinedActions).some((key) => {
            const item = combinedActions[key];
            if (moduleName && key === moduleName) {
                actions = bindActionCreators(item, dispatch);
                return true;
            }
            actions[key] = bindActionCreators(item, dispatch);
            return false;
        });
        return {
            actions,
            ...mapDispatchToProps
        };
    };
    return target => connect(mapStateToProps, mapDispatchToPropsWrap)(target);
};

export default createStore(combineReducers({
    home
}), applyMiddleware(...middlewares));

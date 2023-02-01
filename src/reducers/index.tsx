import { combineReducers } from 'redux';
import authReducer from './auth';
import balanceReducer from './balance';

const allReducers = combineReducers({
    auth: authReducer,
    balance: balanceReducer
});

export default allReducers;
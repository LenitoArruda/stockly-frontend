import { combineReducers } from 'redux';
import { userReducer } from './user/slice';

export const rootReducer = combineReducers({ userReducer });

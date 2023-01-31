// import { applyMiddleware, combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit'

import allReducers from './reducers';

export default  configureStore({
    reducer: allReducers,
  })
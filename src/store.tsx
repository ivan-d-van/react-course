// import { applyMiddleware, combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit'

import allReducers from './reducers';

export const store = configureStore({
    reducer: allReducers,
  })

export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

import * as authApi from '../api/auth';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const login = createAsyncThunk(
    'login',
    async ({ email, password }) => {
        try {
            const  idToken = await authApi.login(email, password);
            return idToken;
        } catch (error) {
            alert(error.response.data)
        }
    })

export const register = createAsyncThunk(
    'register',
    async (action) => {
        try {
            const idToken = await authApi.register(action.username, action.email, action.password);
            return idToken;
        } catch (error) {
            alert(error.response.data)
    }
})
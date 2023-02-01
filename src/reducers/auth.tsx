import { createSlice } from '@reduxjs/toolkit'
import { login, register } from '../actions/auth';

export interface AuthState {
    idToken: string | null;
    error: string | null;
}

const initialState: AuthState = {
  idToken: localStorage.getItem('idToken') || null,
  error: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginSuccess: (state, action) => {
            localStorage.setItem('idToken', action.payload);
            return {
                ...state,
                idToken: action.payload,
                error: null,
            }
        },
        registerSuccess: (state, action) => {
            console.log('registerSuccess action.payload is: ', action)
            localStorage.setItem('idToken', action.payload);
            return {
                ...state,
                idToken: action.payload,
                error: null,
            }
        },
        loginFailed: (state, action) => {
            return {
                ...state,
                error: action.payload,
            }
        },
        registerFailed: (state, action) => {
            return {
                ...state,
                error: action.payload,
            }
        },
        logout: (state) => {
            localStorage.removeItem('idToken');
            window.location.reload();
            return {
                ...state,
                idToken: null,
                error: null,
            }
        }
    },
    extraReducers: {
        [register.fulfilled.toString()]: (state, action) => {
            localStorage.setItem('idToken', action.payload);
            return {
                ...state,
                idToken: action.payload.idToken,
                error: null,
            }
        },
        [login.fulfilled.toString()]: (state, action) => {
            localStorage.setItem('idToken', action.payload);
            return {
                ...state,
                idToken: action.payload.idToken,
                error: null,
            }
        }
    }
})

export default authSlice.reducer;
export const { loginSuccess, registerSuccess, loginFailed, registerFailed, logout } = authSlice.actions;
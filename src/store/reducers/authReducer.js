import { createAsyncThunk, createReducer } from '@reduxjs/toolkit'
import { AuthApiServices } from '../actions/authAction'

const loadingStates = {
    idle: 'idle',
    pending: 'pending'
}

let initialState = {
    error: null,
    loading: loadingStates.idle,
    user: null,
    token: null
}

export const loginUserRequest = createAsyncThunk(
    'AuthReducer/loginUserRequest',
    async (payload, thunkApi) => {
        const response = await AuthApiServices.login(payload, thunkApi)
        return response
    }
)

export const logoutUserRequest = createAsyncThunk(
    'AuthReducer/logoutUserRequest',
    async () => {

    }
)

export const registerUserRequest = createAsyncThunk(
    'AuthReducer/registerUserRequest',
    async (payload, thunkApi) => {
        const response = await AuthApiServices.register(payload, thunkApi)
        return response
    }
)

const AuthReducer = createReducer(initialState, {

    [loginUserRequest.pending]: state => {
        return {
            ...state,
            error: null,
            loading: loadingStates.pending
        }
    },

    [loginUserRequest.fulfilled]: (state, action) => {
        console.log(action.payload.data)
        return {
            ...state,
            error: null,
            loading: loadingStates.idle,
            ...action.payload.data
        }
    },

    [loginUserRequest.rejected]: (state, action) => {
        return {
            ...state,
            error: action.payload?.response?.data,
            loading: loadingStates.idle,
            auth: null
        }
    },

    [logoutUserRequest.fulfilled]: (state, action) => {
        return {
            user: null,
            token: null,
            error: null,
            loading: loadingStates.idle
        }
    },

})

export default AuthReducer

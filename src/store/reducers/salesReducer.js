import { createAsyncThunk, createReducer } from '@reduxjs/toolkit'
import { SalesApiServices } from '../actions/salesAction'

const loadingStates = {
  idle: 'idle',
  pending: 'pending'
}

let initialState = {
  allSales: null,
  error: null,
  loading: loadingStates.idle
}

export const getAllSalesRequest = createAsyncThunk('SalesReducer/getAllSalesRequest', async (payload, thunkApi) => {
  const response = await SalesApiServices.getAllSales(payload, thunkApi)
  return response
})

const SalesReducer = createReducer(initialState, {
  [getAllSalesRequest.pending]: state => {
    return {
      ...state,
      error: null,
      loading: loadingStates.pending
    }
  },

  [getAllSalesRequest.fulfilled]: (state, action) => {
    return {
      ...state,
      error: null,
      loading: loadingStates.idle,
      allSales: action.payload.data?.data
    }
  },

  [getAllSalesRequest.rejected]: (state, action) => {
    return {
      ...state,
      error: action.payload?.response?.data,
      loading: loadingStates.idle
    }
  }
})

export default SalesReducer

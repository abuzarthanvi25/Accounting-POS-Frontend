import { createAsyncThunk, createReducer } from '@reduxjs/toolkit'
import { DashboardApiServices } from '../actions/dashboardAction'

const loadingStates = {
  idle: 'idle',
  pending: 'pending'
}

let initialState = {
  dashboardData: null,
  error: null,
  loading: loadingStates.idle
}

export const getDashboardDataRequest = createAsyncThunk(
  'DashboardReducer/getDashboardDataRequest',
  async (payload, thunkApi) => {
    const response = await DashboardApiServices.getDashboardData(payload, thunkApi)
    return response
  }
)

const DashboardReducer = createReducer(initialState, {
  [getDashboardDataRequest.pending]: state => {
    return {
      ...state,
      error: null,
      loading: loadingStates.pending
    }
  },

  [getDashboardDataRequest.fulfilled]: (state, action) => {
    return {
      ...state,
      error: null,
      loading: loadingStates.idle,
      dashboardData: action.payload.data?.data
    }
  },

  [getDashboardDataRequest.rejected]: (state, action) => {
    return {
      ...state,
      error: action.payload?.response?.data,
      loading: loadingStates.idle
    }
  }
})

export default DashboardReducer

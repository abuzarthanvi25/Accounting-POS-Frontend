import { createAsyncThunk, createReducer } from '@reduxjs/toolkit'
import { CustomerApiServices } from '../actions/customerAction'

const loadingStates = {
  idle: 'idle',
  pending: 'pending'
}

let initialState = {
  allCustomers: null,
  error: null,
  loading: loadingStates.idle
}

export const getAllCustomersRequest = createAsyncThunk(
  'CustomerReducer/getAllCustomersRequest',
  async (payload, thunkApi) => {
    const response = await CustomerApiServices.getAllCustomers(payload, thunkApi)
    return response
  }
)

export const addACustomerRequest = createAsyncThunk(
  'CustomerReducer/addACustomerRequest',
  async (payload, thunkApi) => {
    const response = await CustomerApiServices.addACustomer(payload, thunkApi)
    return response
  }
)

const CustomerReducer = createReducer(initialState, {
  [getAllCustomersRequest.pending]: state => {
    return {
      ...state,
      error: null,
      loading: loadingStates.pending
    }
  },

  [getAllCustomersRequest.fulfilled]: (state, action) => {
    return {
      ...state,
      error: null,
      loading: loadingStates.idle,
      allCustomers: action.payload.data?.data
    }
  },

  [getAllCustomersRequest.rejected]: (state, action) => {
    return {
      ...state,
      error: action.payload?.response?.data,
      loading: loadingStates.idle
    }
  },
  [addACustomerRequest.pending]: state => {
    return {
      ...state,
      error: null,
      loading: loadingStates.pending
    }
  },

  [addACustomerRequest.fulfilled]: (state, action) => {
    return {
      ...state,
      error: null,
      loading: loadingStates.idle,
      customer: action.payload.data?.data
    }
  },

  [addACustomerRequest.rejected]: (state, action) => {
    return {
      ...state,
      error: action.payload?.response?.data,
      loading: loadingStates.idle
    }
  }
})

export default CustomerReducer

import { createAsyncThunk, createReducer } from '@reduxjs/toolkit'
import { InvoiceApiServices } from '../actions/invoiceAction'

const loadingStates = {
  idle: 'idle',
  pending: 'pending'
}

let initialState = {
  allInvoices: null,
  error: null,
  loading: loadingStates.idle
}

export const getAllInvoicesRequest = createAsyncThunk(
  'InvoiceReducer/getAllInvoicesRequest',
  async (payload, thunkApi) => {
    const response = await InvoiceApiServices.getAllOrders(payload, thunkApi)
    return response
  }
)

const InvoiceReducer = createReducer(initialState, {
  [getAllInvoicesRequest.pending]: state => {
    return {
      ...state,
      error: null,
      loading: loadingStates.pending
    }
  },

  [getAllInvoicesRequest.fulfilled]: (state, action) => {
    return {
      ...state,
      error: null,
      loading: loadingStates.idle,
      allInvoices: action.payload.data?.data
    }
  },

  [getAllInvoicesRequest.rejected]: (state, action) => {
    return {
      ...state,
      error: action.payload?.response?.data,
      loading: loadingStates.idle
    }
  }
})

export default InvoiceReducer

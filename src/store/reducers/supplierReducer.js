import { createAsyncThunk, createReducer } from '@reduxjs/toolkit'
import { SupplierApiServices } from '../actions/supplierAction'

const loadingStates = {
  idle: 'idle',
  pending: 'pending'
}

let initialState = {
  allSuppliers: null,
  error: null,
  loading: loadingStates.idle
}

export const getAllSuppliersRequest = createAsyncThunk(
  'SupplierReducer/getAllSuppliersRequest',
  async (payload, thunkApi) => {
    const response = await SupplierApiServices.getAllSuppliers(payload, thunkApi)
    return response
  }
)

export const addASupplierRequest = createAsyncThunk(
  'SupplierReducer/addASupplierRequest',
  async (payload, thunkApi) => {
    const response = await SupplierApiServices.addASupplier(payload, thunkApi)
    return response
  }
)

const SupplierReducer = createReducer(initialState, {
  [getAllSuppliersRequest.pending]: state => {
    return {
      ...state,
      error: null,
      loading: loadingStates.pending
    }
  },

  [getAllSuppliersRequest.fulfilled]: (state, action) => {
    return {
      ...state,
      error: null,
      loading: loadingStates.idle,
      allSuppliers: action.payload.data?.data
    }
  },

  [getAllSuppliersRequest.rejected]: (state, action) => {
    return {
      ...state,
      error: action.payload?.response?.data,
      loading: loadingStates.idle
    }
  },
  [addASupplierRequest.pending]: state => {
    return {
      ...state,
      error: null,
      loading: loadingStates.pending
    }
  },

  [addASupplierRequest.fulfilled]: (state, action) => {
    return {
      ...state,
      error: null,
      loading: loadingStates.idle,
      customer: action.payload.data?.data
    }
  },

  [addASupplierRequest.rejected]: (state, action) => {
    return {
      ...state,
      error: action.payload?.response?.data,
      loading: loadingStates.idle
    }
  }
})

export default SupplierReducer

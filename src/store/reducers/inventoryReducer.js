import { createAsyncThunk, createReducer } from '@reduxjs/toolkit'
import { InventoryApiServices } from '../actions/inventoryAction'

const loadingStates = {
  idle: 'idle',
  pending: 'pending'
}

let initialState = {
  productsInInventory: null,
  error: null,
  loading: loadingStates.idle
}

export const getAllProductsInInventoryRequest = createAsyncThunk(
  'InventoryReducer/getAllProductsInInventoryRequest',
  async (payload, thunkApi) => {
    const response = await InventoryApiServices.getAllProductsInInventory(payload, thunkApi)
    return response
  }
)

const InventoryReducer = createReducer(initialState, {
  [getAllProductsInInventoryRequest.pending]: state => {
    return {
      ...state,
      error: null,
      loading: loadingStates.pending
    }
  },

  [getAllProductsInInventoryRequest.fulfilled]: (state, action) => {
    return {
      ...state,
      error: null,
      loading: loadingStates.idle,
      productsInInventory: action.payload.data?.data
    }
  },

  [getAllProductsInInventoryRequest.rejected]: (state, action) => {
    return {
      ...state,
      error: action.payload?.response?.data,
      loading: loadingStates.idle
    }
  }
})

export default InventoryReducer

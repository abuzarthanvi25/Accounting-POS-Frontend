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

export const addProductsToInventoryRequest = createAsyncThunk(
  'InventoryReducer/addProductsToInventoryRequest',
  async (payload, thunkApi) => {
    const response = await InventoryApiServices.addProductsToInventory(payload, thunkApi)
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
  },

  [addProductsToInventoryRequest.pending]: state => {
    return {
      ...state,
      error: null,
      loading: loadingStates.pending
    }
  },

  [addProductsToInventoryRequest.fulfilled]: (state, action) => {
    return {
      ...state,
      error: null,
      loading: loadingStates.idle
    }
  },

  [addProductsToInventoryRequest.rejected]: (state, action) => {
    return {
      ...state,
      error: action.payload?.response?.data,
      loading: loadingStates.idle
    }
  }
})

export default InventoryReducer

import { createAsyncThunk, createReducer } from '@reduxjs/toolkit'
import { MarketplaceApiServices } from '../actions/marketplaceAction'

const loadingStates = {
  idle: 'idle',
  pending: 'pending'
}

let initialState = {
  marketplaceProducts: null,
  error: null,
  loading: loadingStates.idle
}

export const getMarketplaceProductsRequest = createAsyncThunk(
  'MarketplaceReducer/getMarketplaceProductsRequest',
  async (payload, thunkApi) => {
    const response = await MarketplaceApiServices.getAllMarketplaceProducts(payload, thunkApi)
    return response
  }
)

export const addAMarketplaceProductRequest = createAsyncThunk(
  'MarketplaceReducer/addAMarketplaceProductRequest',
  async (payload, thunkApi) => {
    const response = await MarketplaceApiServices.getAllMarketplaceProducts(payload, thunkApi)
    return response
  }
)

const MarketplaceReducer = createReducer(initialState, {
  [getMarketplaceProductsRequest.pending]: state => {
    return {
      ...state,
      error: null,
      loading: loadingStates.pending
    }
  },

  [getMarketplaceProductsRequest.fulfilled]: (state, action) => {
    return {
      ...state,
      error: null,
      loading: loadingStates.idle,
      marketplaceProducts: action.payload.data?.data
    }
  },

  [getMarketplaceProductsRequest.rejected]: (state, action) => {
    return {
      ...state,
      error: action.payload?.response?.data,
      loading: loadingStates.idle
    }
  },
  [addAMarketplaceProductRequest.pending]: state => {
    return {
      ...state,
      error: null,
      loading: loadingStates.pending
    }
  },

  [addAMarketplaceProductRequest.fulfilled]: state => {
    return {
      ...state,
      error: null,
      loading: loadingStates.idle
    }
  },

  [addAMarketplaceProductRequest.rejected]: (state, action) => {
    return {
      ...state,
      error: action.payload?.response?.data,
      loading: loadingStates.idle
    }
  }
})

export default MarketplaceReducer

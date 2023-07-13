import { createAsyncThunk, createReducer } from '@reduxjs/toolkit'
import { OrderApiServices } from '../actions/ordersAction'

const loadingStates = {
  idle: 'idle',
  pending: 'pending'
}

let initialState = {
  allOrders: null,
  error: null,
  loading: loadingStates.idle
}

export const getAllOrdersRequest = createAsyncThunk('OrdersReducer/getAllOrdersRequest', async (payload, thunkApi) => {
  const response = await OrderApiServices.getAllOrders(payload, thunkApi)
  return response
})

export const addAnOrderRequest = createAsyncThunk('OrdersReducer/addAnOrderRequest', async (payload, thunkApi) => {
  const response = await OrderApiServices.addAnOrder(payload, thunkApi)
  return response
})

const OrdersReducer = createReducer(initialState, {
  [getAllOrdersRequest.pending]: state => {
    return {
      ...state,
      error: null,
      loading: loadingStates.pending
    }
  },

  [getAllOrdersRequest.fulfilled]: (state, action) => {
    return {
      ...state,
      error: null,
      loading: loadingStates.idle,
      allOrders: action.payload.data?.data
    }
  },

  [getAllOrdersRequest.rejected]: (state, action) => {
    return {
      ...state,
      error: action.payload?.response?.data,
      loading: loadingStates.idle
    }
  },

  [addAnOrderRequest.pending]: state => {
    return {
      ...state,
      error: null,
      loading: loadingStates.pending
    }
  },

  [addAnOrderRequest.fulfilled]: (state, action) => {
    return {
      ...state,
      error: null,
      loading: loadingStates.idle
    }
  },

  [addAnOrderRequest.rejected]: (state, action) => {
    return {
      ...state,
      error: action.payload?.response?.data,
      loading: loadingStates.idle
    }
  }
})

export default OrdersReducer

import { createAsyncThunk, createReducer } from '@reduxjs/toolkit'
import { JournalApiServices } from '../actions/journalAction'

const loadingStates = {
  idle: 'idle',
  pending: 'pending'
}

let initialState = {
  allJournalEntries: null,
  error: null,
  loading: loadingStates.idle
}

export const getAllJournalEntriesRequest = createAsyncThunk(
  'CustomerReducer/getAllJournalEntriesRequest',
  async (payload, thunkApi) => {
    const response = await JournalApiServices.getAllJournalEntries(payload, thunkApi)
    return response
  }
)

export const addJournalEntryRequest = createAsyncThunk(
  'CustomerReducer/addJournalEntryRequest',
  async (payload, thunkApi) => {
    const response = await JournalApiServices.addAJournalEntry(payload, thunkApi)
    return response
  }
)

const JournalReducer = createReducer(initialState, {
  [getAllJournalEntriesRequest.pending]: state => {
    return {
      ...state,
      error: null,
      loading: loadingStates.pending
    }
  },

  [getAllJournalEntriesRequest.fulfilled]: (state, action) => {
    return {
      ...state,
      error: null,
      loading: loadingStates.idle,
      allJournalEntries: action.payload.data?.data
    }
  },

  [getAllJournalEntriesRequest.rejected]: (state, action) => {
    return {
      ...state,
      error: action.payload?.response?.data,
      loading: loadingStates.idle
    }
  },
  [addJournalEntryRequest.pending]: state => {
    return {
      ...state,
      error: null,
      loading: loadingStates.pending
    }
  },

  [addJournalEntryRequest.fulfilled]: (state, action) => {
    return {
      ...state,
      error: null,
      loading: loadingStates.idle
    }
  },

  [addJournalEntryRequest.rejected]: (state, action) => {
    return {
      ...state,
      error: action.payload?.response?.data,
      loading: loadingStates.idle
    }
  }
})

export default JournalReducer

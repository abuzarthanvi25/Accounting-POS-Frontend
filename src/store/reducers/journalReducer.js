import { createAsyncThunk, createReducer } from '@reduxjs/toolkit'
import { JournalApiServices } from '../actions/journalAction'

const loadingStates = {
  idle: 'idle',
  pending: 'pending'
}

let initialState = {
  allJournalEntries: null,
  allBalanceSheetEntries: null,
  allIncomeStatementEntries: null,
  allOwnersEquityEntries: null,
  error: null,
  loading: loadingStates.idle
}

export const getAllJournalEntriesRequest = createAsyncThunk(
  'JournalReducer/getAllJournalEntriesRequest',
  async (payload, thunkApi) => {
    const response = await JournalApiServices.getAllJournalEntries(payload, thunkApi)
    return response
  }
)

export const getBalanceSheetRequest = createAsyncThunk(
  'JournalReducer/getBalanceSheetRequest',
  async (payload, thunkApi) => {
    const response = await JournalApiServices.getBalanceSheet(payload, thunkApi)
    return response
  }
)

export const getIncomeStatementRequest = createAsyncThunk(
  'JournalReducer/getIncomeStatementRequest',
  async (payload, thunkApi) => {
    const response = await JournalApiServices.getIncomeStatement(payload, thunkApi)
    return response
  }
)

export const getStatementOfOwnersEquityRequest = createAsyncThunk(
  'JournalReducer/getStatementOfOwnersEquityRequest',
  async (payload, thunkApi) => {
    const response = await JournalApiServices.getStatmentOfOwnersEquity(payload, thunkApi)
    return response
  }
)

export const addJournalEntryRequest = createAsyncThunk(
  'JournalReducer/addJournalEntryRequest',
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

  [getBalanceSheetRequest.pending]: state => {
    return {
      ...state,
      error: null,
      loading: loadingStates.pending
    }
  },

  [getBalanceSheetRequest.fulfilled]: (state, action) => {
    return {
      ...state,
      error: null,
      loading: loadingStates.idle,
      allBalanceSheetEntries: action.payload.data?.data
    }
  },

  [getBalanceSheetRequest.rejected]: (state, action) => {
    return {
      ...state,
      error: action.payload?.response?.data,
      loading: loadingStates.idle
    }
  },

  [getIncomeStatementRequest.pending]: state => {
    return {
      ...state,
      error: null,
      loading: loadingStates.pending
    }
  },

  [getIncomeStatementRequest.fulfilled]: (state, action) => {
    return {
      ...state,
      error: null,
      loading: loadingStates.idle,
      allIncomeStatementEntries: action.payload.data?.data
    }
  },

  [getIncomeStatementRequest.rejected]: (state, action) => {
    return {
      ...state,
      error: action.payload?.response?.data,
      loading: loadingStates.idle
    }
  },

  [getStatementOfOwnersEquityRequest.pending]: state => {
    return {
      ...state,
      error: null,
      loading: loadingStates.pending
    }
  },

  [getStatementOfOwnersEquityRequest.fulfilled]: (state, action) => {
    return {
      ...state,
      error: null,
      loading: loadingStates.idle,
      allOwnersEquityEntries: action.payload.data?.data
    }
  },

  [getStatementOfOwnersEquityRequest.rejected]: (state, action) => {
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

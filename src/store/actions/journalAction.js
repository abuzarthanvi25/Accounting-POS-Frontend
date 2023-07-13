import ApiResource from '../../services/api'
import ApiConstants from '../../configs/constants'

async function getAllJournalEntries(payload, thunkAPI) {
  try {
    const response = await ApiResource.get(ApiConstants.journal)
    return response
  } catch (error) {
    return thunkAPI.rejectWithValue(error)
  }
}

async function getBalanceSheet(payload, thunkAPI) {
  try {
    const { date_of_transaction } = payload

    let response = null

    if (date_of_transaction) {
      response = await ApiResource.get(`${ApiConstants.balanceSheet}?date_of_transaction=${date_of_transaction}`)
    } else {
      response = await ApiResource.get(ApiConstants.balanceSheet)
    }
    return response
  } catch (error) {
    return thunkAPI.rejectWithValue(error)
  }
}

async function getIncomeStatement(payload, thunkAPI) {
  try {
    const { date_of_transaction } = payload

    let response = null

    if (date_of_transaction) {
      response = await ApiResource.get(`${ApiConstants.incomeStatement}?date_of_transaction=${date_of_transaction}`)
    } else {
      response = await ApiResource.get(ApiConstants.incomeStatement)
    }
    return response
  } catch (error) {
    return thunkAPI.rejectWithValue(error)
  }
}

async function getStatmentOfOwnersEquity(payload, thunkAPI) {
  try {
    const { date_of_transaction } = payload

    let response = null

    if (date_of_transaction) {
      response = await ApiResource.get(`${ApiConstants.ownersEquity}?date_of_transaction=${date_of_transaction}`)
    } else {
      response = await ApiResource.get(ApiConstants.ownersEquity)
    }
    return response
  } catch (error) {
    return thunkAPI.rejectWithValue(error)
  }
}

async function addAJournalEntry(payload, thunkAPI) {
  try {
    const response = await ApiResource.post(ApiConstants.journal, payload)
    return response
  } catch (error) {
    return thunkAPI.rejectWithValue(error)
  }
}

export const JournalApiServices = {
  getAllJournalEntries,
  addAJournalEntry,
  getBalanceSheet,
  getIncomeStatement,
  getStatmentOfOwnersEquity
}

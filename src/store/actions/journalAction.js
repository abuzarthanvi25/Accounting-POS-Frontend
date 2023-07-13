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
  addAJournalEntry
}

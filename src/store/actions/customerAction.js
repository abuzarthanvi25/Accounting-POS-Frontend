import ApiResource from '../../services/api'
import ApiConstants from '../../configs/constants'

async function getAllCustomers(payload, thunkAPI) {
  try {
    const response = await ApiResource.get(ApiConstants.customers)
    return response
  } catch (error) {
    return thunkAPI.rejectWithValue(error)
  }
}

export const CustomerApiServices = {
  getAllCustomers
}

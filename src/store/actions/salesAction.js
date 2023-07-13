import ApiResource from '../../services/api'
import ApiConstants from '../../configs/constants'

async function getAllSales(payload, thunkAPI) {
  try {
    const response = await ApiResource.get(ApiConstants.sales)
    return response
  } catch (error) {
    return thunkAPI.rejectWithValue(error)
  }
}

export const SalesApiServices = {
  getAllSales
}

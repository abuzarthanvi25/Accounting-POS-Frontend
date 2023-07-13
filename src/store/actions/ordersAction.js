import ApiResource from '../../services/api'
import ApiConstants from '../../configs/constants'

async function getAllOrders(payload, thunkAPI) {
  try {
    const response = await ApiResource.get(ApiConstants.orders)
    return response
  } catch (error) {
    return thunkAPI.rejectWithValue(error)
  }
}

export const OrderApiServices = {
  getAllOrders
}

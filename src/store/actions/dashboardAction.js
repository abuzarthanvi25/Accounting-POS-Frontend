import ApiResource from '../../services/api'
import ApiConstants from '../../configs/constants'

async function getDashboardData(payload, thunkAPI) {
  try {
    const response = await ApiResource.get(ApiConstants.dashboard)
    return response
  } catch (error) {
    return thunkAPI.rejectWithValue(error)
  }
}

export const DashboardApiServices = {
  getDashboardData
}

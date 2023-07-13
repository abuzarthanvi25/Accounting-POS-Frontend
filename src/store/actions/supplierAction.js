import ApiResource from '../../services/api'
import ApiConstants from '../../configs/constants'

async function getAllSuppliers(payload, thunkAPI) {
  try {
    const response = await ApiResource.get(ApiConstants.suppliers)
    return response
  } catch (error) {
    return thunkAPI.rejectWithValue(error)
  }
}

async function addASupplier(payload, thunkAPI) {
  try {
    const response = await ApiResource.post(ApiConstants.suppliers, payload)
    return response
  } catch (error) {
    return thunkAPI.rejectWithValue(error)
  }
}

export const SupplierApiServices = {
  getAllSuppliers,
  addASupplier
}

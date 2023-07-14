import ApiResource from '../../services/api'
import ApiConstants from '../../configs/constants'

async function getAllProductsInInventory(payload, thunkAPI) {
  try {
    const response = await ApiResource.get(ApiConstants.inventory)
    return response
  } catch (error) {
    return thunkAPI.rejectWithValue(error)
  }
}

async function addProductsToInventory(payload, thunkAPI) {
  try {
    const response = await ApiResource.post(ApiConstants.addProductsToInventory, payload)
    return response
  } catch (error) {
    return thunkAPI.rejectWithValue(error)
  }
}

export const InventoryApiServices = {
  getAllProductsInInventory,
  addProductsToInventory
}

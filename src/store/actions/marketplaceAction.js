import ApiResource from '../../services/api'
import ApiConstants from '../../configs/constants'

async function getAllMarketplaceProducts(payload, thunkAPI) {
  try {
    const response = await ApiResource.get(ApiConstants.marketplace)
    return response
  } catch (error) {
    return thunkAPI.rejectWithValue(error)
  }
}

async function addProductToMarketplace(payload, thunkAPI) {
  try {
    const response = await ApiResource.post(ApiConstants.addToMarketplace, payload)
    return response
  } catch (error) {
    return thunkAPI.rejectWithValue(error)
  }
}

export const MarketplaceApiServices = {
  getAllMarketplaceProducts,
  addProductToMarketplace
}

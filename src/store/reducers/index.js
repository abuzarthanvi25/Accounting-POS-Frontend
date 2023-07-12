import { combineReducers } from 'redux'
import CustomerReducer from './customerReducer'
import InventoryReducer from './inventoryReducer'

// Concatenate all reducers

export const rootReducer = combineReducers({
  customers: CustomerReducer,
  inventory: InventoryReducer
})

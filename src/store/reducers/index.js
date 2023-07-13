import { combineReducers } from 'redux'
import CustomerReducer from './customerReducer'
import InventoryReducer from './inventoryReducer'
import OrdersReducer from './ordersReducer'
import MarketplaceReducer from './marketplaceReducer'

// Concatenate all reducers

export const rootReducer = combineReducers({
  customers: CustomerReducer,
  inventory: InventoryReducer,
  orders: OrdersReducer,
  marketplace: MarketplaceReducer
})

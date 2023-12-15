import { combineReducers } from 'redux'
import CustomerReducer from './customerReducer'
import InventoryReducer from './inventoryReducer'
import OrdersReducer from './ordersReducer'
import MarketplaceReducer from './marketplaceReducer'
import SupplierReducer from './supplierReducer'
import SalesReducer from './salesReducer'
import InvoiceReducer from './InvoiceReducer'
import JournalReducer from './journalReducer'
import DashboardReducer from './dashboardReducer'
import AuthReducer from './authReducer'

// Concatenate all reducers

export const rootReducer = combineReducers({
  dashboard: DashboardReducer,
  customers: CustomerReducer,
  inventory: InventoryReducer,
  orders: OrdersReducer,
  marketplace: MarketplaceReducer,
  suppliers: SupplierReducer,
  sales: SalesReducer,
  invoices: InvoiceReducer,
  journal: JournalReducer,
  auth: AuthReducer
})

import { combineReducers } from 'redux'
import CustomerReducer from './customerReducer'

// Concatenate all reducers

export const rootReducer = combineReducers({
  customers: CustomerReducer
})

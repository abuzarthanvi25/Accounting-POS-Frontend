import { persistReducer } from 'redux-persist'
import { configureStore } from '@reduxjs/toolkit'
import { createLogger } from 'redux-logger'
import { persistStore } from 'redux-persist'
import { rootReducer } from './reducers'
import thunkMiddleware from 'redux-thunk'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
  key: 'root',
  storage
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const middlewares = [thunkMiddleware, createLogger()]

const store = configureStore({
  reducer: persistedReducer,
  middleware: middlewares
})

let persistor = persistStore(store)

const configureStores = () => {
  return { persistor, store }
}

export default configureStores

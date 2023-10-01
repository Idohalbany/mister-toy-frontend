import { combineReducers, legacy_createStore as createStore } from 'redux'
import { toyReducer } from './reducers/toy.reducer.js'
import { userReducer } from './reducers/user.reducer.js'
import { systemReducer } from './reducers/system.reducer.js'

const middleware = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__()

const rootReducer = combineReducers({
  toyModule: toyReducer,
  userModule: userReducer,
  systemModule: systemReducer,
})

export const store = createStore(rootReducer, middleware)

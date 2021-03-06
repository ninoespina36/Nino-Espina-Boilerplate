import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import authReducer from './authReducer';
import todoReducer from './todoReducer';

// Whitelisting means storing the reducer's state into local storage via redux-persist
const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['auth', 'todo']
}

// Combine all reducers here
const reducers  = combineReducers({ 
    auth: authReducer,
    todo: todoReducer
});

const rootReducer = (state: any, action: any) => {

    // Reset State when `auth/logout` is dispatched
    if (action.type === 'auth/logout') {
      state = undefined;
    }
    return reducers(state, action);
  };

// Combine the reducers and redux-persist config
export default persistReducer(persistConfig, rootReducer);
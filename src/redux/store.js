import { createStore, combineReducers } from 'redux';

import popupControlerReducer from './reducers/popupControler'

const rootReducer = combineReducers({
    popupControlerReducer
})

const store = createStore(rootReducer); 

export default store;
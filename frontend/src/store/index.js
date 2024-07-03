import {configureStore} from '@reduxjs/toolkit'

import rootReducer from './rootReducer';
//import logger from 'redux-logger'
//import thunk from 'redux-thunk'

const store = configureStore({
    reducer: rootReducer,
    //middleware: [thunk, logger]
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

export default store;
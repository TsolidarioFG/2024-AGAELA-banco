import {combineReducers} from 'redux';

import app from '../modules/app';
import users from '../modules/users';
import products from '../modules/products';
import loans from '../modules/loans';

const rootReducer = combineReducers({
    app: app.reducer,
    users: users.reducer,
    products: products.reducer,
    loans: loans.reducer,
});

export default rootReducer;

import {combineReducers} from 'redux';

import * as actionTypes from './actionTypes';

const initialState = {
    product: null
};

const product = (state = initialState.product, action) => {
    switch (action.type) {
        case actionTypes.CREATE_PRODUCT_COMPLETED:
            return action.product;
        case actionTypes.UPDATE_PRODUCT_COMPLETED:
            return action.product;
        case actionTypes.DELETE_PRODUCT_COMPLETED:
            return state;
        default:
            return state;
    }
};

const reducer = combineReducers({
    product
});

export default reducer;


